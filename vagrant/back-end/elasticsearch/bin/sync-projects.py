
#
#   Reload projects from project files and update references in resumes to match.
#
#   Usage: python sync-projects.py <path to dir with JSON projects>
#
#FIXME:this is a temporary solution. Problems:
#   - this causes the system to be in an inconsistent state momentarily while resume ids are updated to refer to the new projects (could just run sync at odd hours)
#   - this requires resumes to reference only projects in salesforce (work on projects not found in SF can still be described in a resume). If we want to store projects that aren't synced with salesforce, we could use a flag in the project (e.g. 'synced': false) so the sync process doesn't delete it
#   - projects have to be treated as read-only
#
import sys, os, glob
from datetime import date
import json

if not os.environ["RW_GIT_BASE_DIR"] == "":
    GIT_BASE_DIR = os.environ["RW_GIT_BASE_DIR"]
else:
    GIT_BASE_DIR = '/home/kerisman/work/avalonresumewrangler'

DATALAYER_LIB_PATH = GIT_BASE_DIR + '/back-end/api/app/datalayer'

sys.path.append(DATALAYER_LIB_PATH)
from datalayer import DataLayer

print "************************"
print "sync-projects.py running..."
print "Using System paths: "
print "GIT_BASE_DIR: %s" % GIT_BASE_DIR
print "************************"

dl = DataLayer.factory( 'Elasticsearch' )

#-------

def project_with_updated_userids(project):
    # replace names in salesforce project with internal userIds from the system
    json_project = json.loads(project)
    positions = json_project['positions']
    for i in range(len(positions)):
        p = positions[i]
        filledBy = p['filledBy']
        for j in range(len(filledBy)):
            name = filledBy[j]['userFullName']
            fullname = name.split(' ')
            fn = fullname[0]
            ln = fullname[-1]
            user = dl.find_users(firstname=fn, lastname=ln)
            if(user['total'] > 0):
                #FIXME:assuming there will only be 1 user with a particular firstname and lastname
                # is obviously not reliable. Should probably get email from salesforce and use it here
                # as a unique id instead of firstname/lastname
                user_data = user['hits'][0]['_source']
                userId = user_data['userId']
                json_project['positions'][i]['filledBy'][j]['userId'] = userId

    new_project = json.dumps(json_project)
    return new_project

#-------

# Delete existing project documents
existing_projects = dl.list_projects()
project_ids = map(lambda p: p['_id'], existing_projects)
for i in project_ids:
    dl.delete_project(i)

input_dir = sys.argv[1]

# Load new project documents containing the latest projects
project_filenames = map(
    lambda p: os.path.basename(p),
    glob.glob(os.path.join(input_dir, '*.json'))
)
for project_filename in project_filenames:
    with open( os.path.join(input_dir, project_filename), 'r') as f:
        project = f.read()

        # update userIds
        updated_project = project_with_updated_userids(project)

        json_project = json.loads(project)
        project_id =json_project['salesforceRecordId']

        dl.create_or_update_project(updated_project, project_id)

# Visit each resume, updating the ids for projects to match the new
# projects that were just loaded
#FIXME:
#   This shouldn't be necessary after we get the ids to line up to begin with. This was initially done because there were fake projects that had been generated from resume project work descriptions. This code replaced the references to fake projects with references to new projects loaded from salesforce. Once fake projects are gone, resumes will have references to real projects only.
#   *** Syncing new salesforce data will not require updating resume project id references because we now use official salesforce project identifiers that are unique and don't change ***
r_list = dl.list_resumes()
for r in r_list:
    res_id = r['_id']
    resume = dl.get_resume(res_id)

    employmentHistory = resume['_source']['employmentHistory']
    update_resume = False
    for i in range(len(employmentHistory)):
        # i: a job
        # look at all positions in this job...
        all_job_positions = employmentHistory[i]['positions']
        for j in range(len(all_job_positions)):
            # j: a specific job position from resume
            position = all_job_positions[j]
            client_name = position['clientName']

            if(client_name is not None):
                # search for the project that best matches the client name from the resume

                #FIXME:when resume has client name "Turtle Rattle Learning", dl.find_projects will match projects with client name "Cengage Learning"
                #matching_projects = dl.find_projects(client_name=client_name)['hits']

                #FIXME:I can index project.clientName as not_analyzed. But this requires salesforce client names to exactly match the client names in the resumes.
                #project_query = { "query": { "match": { "clientName.raw": client_name } } }

                #FIXME:fuzzy query
                project_query = { "query": { "match": { "clientName.raw": { "query": client_name, "fuzziness": 2, "prefix_length": 1 } } } }

                matching_projects = dl.es.search(index=dl.PROJECT_INDEX, doc_type=dl.PROJECT_TYPE, body=project_query, size=10000)['hits']['hits']

                if matching_projects:
                    project_id = matching_projects[0]['_source']['salesforceRecordId']
                    resume['_source']['employmentHistory'][i]['positions'][j]['clientProjectId'] = project_id
                    update_resume = True
                    print "update resume (id:", res_id, "); client name is '", client_name + "' and project id is ", project_id
                else:
                    # if none of the new projects match, remove clientProjectId
                    del resume['_source']['employmentHistory'][i]['positions'][j]['clientProjectId']
                    update_resume = True

    if update_resume:
        dl.create_or_update_resume(resume['_source'], res_id)

