from datalayer import DataLayer

from elasticsearch import Elasticsearch, exceptions

#-------

def bool_query( must_queries ):
    return {
        'query': {
            'bool': { 'must': must_queries }
        }
    }

def filtered_term_query(term, value): return { 'filtered': { 'filter': { 'term': { term: value } } } }

def nested_skills_query(s):
    return { 'nested': {
            'path': 'skills',
            'query': {
                'match': { 'skills.name': s }
            }
        }
    }

def nested_emp_hist_query(id):
    return { 'nested': {
            'path': 'employmentHistory',
            'query': {
                'match': { 'employmentHistory.positions.clientProjectId': id }
            }
        }
    }

#-------

class ESDataLayer(DataLayer):
    '''A data layer for Elasticsearch.'''

    VALID_DOC_TYPES = ['project', 'resume', 'user']

    USER_INDEX = 'users'
    USER_TYPE = 'user'

    RESUME_INDEX = 'resumes'
    RESUME_TYPE = 'resume'

    PROJECT_INDEX = 'projects'
    PROJECT_TYPE = 'project'

    SKILL_INDEX = 'skills'
    SKILL_TYPE = 'skill'

    STACK_INDEX = 'stacks'
    STACK_TYPE = 'stack'

    STACK_POS_INDEX = 'stack-positions'
    STACK_POS_TYPE = 'stack-position'

    def __init__(self):
        self.es = Elasticsearch()

    def create_index(self, index):
        self.es.indices.create(index)

    def create_mapping(self, mapping, index, type):
        self.es.indices.put_mapping(type, mapping, index)

    #-------

    def create_or_update_doc(self, doc, doc_type, id=None):
        if( doc_type == 'user' ): self.create_or_update_user(doc, id)
        if( doc_type == 'resume' ): self.create_or_update_resume(doc, id)
        if( doc_type == 'project' ): self.create_or_update_project(doc, id)
    
    #------- Users

    def create_or_update_user(self, user, id=None):
        doc_id = None
        if id is None:
            doc_id = DataLayer.uuid()
        else:
            doc_id = id

        self.es.index(index=self.USER_INDEX, doc_type=self.USER_TYPE, body=user, id=doc_id)
        return doc_id

    def list_users(self):
#FIXME:hard-coded size -- figure out the proper way to get ALL RESULTS and do it in all the "list" methods in this class
        users = self.es.search(index=self.USER_INDEX, doc_type=self.USER_TYPE, body={ 'query': { 'match_all': {} }}, size=10000)
        return [ u for u in users['hits']['hits'] ]

    def find_users(self, username, firstname, lastname):
        un_query = fn_query = ln_query = None
        if username is not None: un_query = filtered_term_query( 'username', username.lower() )
        if firstname is not None: fn_query = filtered_term_query( 'firstName', firstname.lower() )
        if lastname is not None: ln_query = filtered_term_query( 'lastName', lastname.lower() )
        queries = filter( lambda q: q is not None, [un_query, fn_query, ln_query] )
        combined_query = bool_query( queries )
        return self.es.search(index=self.USER_INDEX, doc_type=self.USER_TYPE, body=combined_query, size=10000)['hits']

    def get_user(self, id):
        user = self.es.get(index=self.USER_INDEX, doc_type=self.USER_TYPE, id=id)
        return user

    # Delete the specified user and also delete any resumes that reference the user.
    def delete_user(self, id):
        self.es.delete(index=self.USER_INDEX, doc_type=self.USER_TYPE, id=id)

        # maintain referential integrity: delete resumes that reference the now-obsolete user
        resumes = self.find_resumes(userid=id)
        for resume in resumes['hits']:
            resume_id = resume['_id']
            print 'would delete resume with id', resume_id
            print resume
            self.es.delete(index=self.RESUME_INDEX, doc_type=self.RESUME_TYPE, id=resume_id)

    #------- Resumes

    def create_or_update_resume(self, resume, id=None):
        # Generate UUID for new resume: default to DataLayer's UUID but allow caller to
        # pass in a custom UUID. Doing it this way instead of using named args because
        # DataLayer.uuid() needs to be called again for every call to create_resume()
        doc_id = None
        if id is None:
            doc_id = DataLayer.uuid()
        else:
            doc_id = id

        self.es.index(index=self.RESUME_INDEX, doc_type=self.RESUME_TYPE, body=resume, id=doc_id)
        return doc_id

    def list_resumes(self):
        #FIXME:
        # - is "list resume" functionality even needed?
        resumes = self.es.search(index=self.RESUME_INDEX, doc_type=self.RESUME_TYPE, _source=False, size=10000)
        return [ r for r in resumes['hits']['hits'] ]

    #NOTE: using variable.lower() in much of this code because ES mapping stores lowercased text in many cases as part of its normalization
    # (there may be better ways to index the data or other query types to use that don't require this step)

    def find_resumes(self, userid=None, firstname=None, lastname=None, client_project_id=None, skills=[]):
        userid_query = fn_query = ln_query = client_project_query = None
        if userid is not None: userid_query = filtered_term_query( 'userId', userid.lower() )
        if firstname is not None: fn_query = filtered_term_query( 'firstName', firstname.lower() )
        if lastname is not None: ln_query = filtered_term_query( 'lastName', lastname.lower() )
        if client_project_id is not None: client_project_query = nested_emp_hist_query( client_project_id )
        skill_queries = [ nested_skills_query( s.lower() ) for s in skills ] or None
        queries = filter( lambda q: q is not None, [userid_query, fn_query, ln_query, client_project_query, skill_queries] )
        combined_query = bool_query( queries )
        return self.es.search(index=self.RESUME_INDEX, doc_type=self.RESUME_TYPE, body=combined_query, size=1000)['hits']

    def get_resume(self, id):
        resume = self.es.get(index=self.RESUME_INDEX, doc_type=self.RESUME_TYPE, id=id, ignore=[404])
        return resume

    def delete_resume(self, id):
        self.es.delete(index=self.RESUME_INDEX, doc_type=self.RESUME_TYPE, id=id)

    #------- Projects

    def create_or_update_project(self, project, id=None):
        doc_id = None
        if id is None:
            doc_id = DataLayer.uuid()
        else:
            doc_id = id

        self.es.index(index=self.PROJECT_INDEX, doc_type=self.PROJECT_TYPE, body=project, id=doc_id)
        return doc_id

    def find_projects_fulltext(self, q):
        fulltext_query = {
            "query": {
                "query_string": {
                    "fields": ["clientName", "clientDescription", "name", "summary", "projectSkills"],
                    "query": q
                }
            }
        }
        return self.es.search(index=self.PROJECT_INDEX, doc_type=self.PROJECT_TYPE, body=fulltext_query, size=10000)['hits']
    
    def find_projects(self, client_name, start_date_min, start_date_max, end_date_min, end_date_max, summary, project_skills, q=None):
        # if q param supplied, run a full text search
        if q is not None:
            return self.find_projects_fulltext(q)

        # run search against specific fields
        skill_queries = []
        for s in project_skills:
            skill_queries += [ { "match": { "projectSkills": s } } ]
        if len(skill_queries) == 0:
            skill_queries = None

        client_name_query = start_date_query = end_date_query = summary_query = None
        if client_name is not None:
            client_name_query = { "match": {
               "clientName": client_name
            }}
        if start_date_min is not None and start_date_max is not None:
            start_date_query = { "range": {
               "startDate": {
                  "from": start_date_min,
                  "to": start_date_max
               }
            }}
        elif start_date_min is not None:
            start_date_query = { "range": {
               "startDate": {
                  "from": start_date_min,
               }
            }}
        elif start_date_max is not None:
            start_date_query = { "range": {
               "startDate": {
                  "to": start_date_max
               }
            }}
        if end_date_min is not None and end_date_max is not None:
            end_date_query = { "range": {
               "endDate": {
                  "from": end_date_min,
                  "to": end_date_max
               }
            }}
        elif end_date_min is not None:
            end_date_query = { "range": {
               "endDate": {
                  "from": end_date_min,
               }
            }}
        elif end_date_max is not None:
            end_date_query = { "range": {
               "endDate": {
                  "to": end_date_max
               }
            }}
        if summary is not None:
            summary_query = { "match_phrase": {
               "summary": summary
            }}
        must_queries = filter( lambda x: x is not None, [ client_name_query, start_date_query, end_date_query, summary_query, skill_queries ] )
        project_query = bool_query( must_queries )
        return self.es.search(index=self.PROJECT_INDEX, doc_type=self.PROJECT_TYPE, body=project_query, size=10000)['hits']

    def get_project(self, id):
        project = self.es.get(index=self.PROJECT_INDEX, doc_type=self.PROJECT_TYPE, id=id)
        return project

    def delete_project(self, id):
        self.es.delete(index=self.PROJECT_INDEX, doc_type=self.PROJECT_TYPE, id=id)

    #------- Skills

    def create_or_update_skill(self, skill, id):
        self.es.index(index=self.SKILL_INDEX, doc_type=self.SKILL_TYPE, body=skill, id=id)
        return id

    def list_skills(self):
        skills = self.es.search(index=self.SKILL_INDEX, doc_type=self.SKILL_TYPE, size=10000)
        return [ s for s in skills['hits']['hits'] ]

    def delete_skill(self, id):
        self.es.delete(index=self.SKILL_INDEX, doc_type=self.SKILL_TYPE, id=id)

    #------- Stacks

    def create_or_update_stack(self, stack, id):
        self.es.index(index=self.STACK_INDEX, doc_type=self.STACK_TYPE, body=stack, id=id)
        return id

    def list_stacks(self):
        stacks = self.es.search(index=self.STACK_INDEX, doc_type=self.STACK_TYPE, size=10000)
        return [ s for s in stacks['hits']['hits'] ]

    def delete_stack(self, id):
        self.es.delete(index=self.STACK_INDEX, doc_type=self.STACK_TYPE, id=id)

    #------- Stack Positions

    def create_or_update_stack_position(self, stack_position, id):
        self.es.index(index=self.STACK_POS_INDEX, doc_type=self.STACK_POS_TYPE, body=stack_position, id=id)
        return id

    def list_stack_positions(self):
        stackpos = self.es.search(index=self.STACK_POS_INDEX, doc_type=self.STACK_POS_TYPE, size=10000)
        return [ s for s in stackpos['hits']['hits'] ]

    def delete_stack_position(self, id):
        self.es.delete(index=self.STACK_POS_INDEX, doc_type=self.STACK_POS_TYPE, id=id)

    #-------

    def delete_index(self, index):
        self.es.indices.delete(index, ignore=[400, 404])


if __name__ == '__main__':
    dl = DataLayer.factory( 'Elasticsearch' )
    print(dl)
    print(dl.es)
    print 'index: ', dl.RESUME_INDEX
    print 'type: ', dl.RESUME_TYPE
    try:
        print 'resumes: ', dl.list_resumes()
    except exceptions.NotFoundError:
        print '(index missing)'
#    print dl.get_resume('AU76Hwu_NXud7rAthNR8')
#    dl.create_or_update_resume('r')

