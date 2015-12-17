
#
#   Transform resume XML to JSON
#
#   Usage: python convert.py <path to dir with XML> <path to dir to be created for JSON>
#
from xml.etree import ElementTree
import json
import sys, os, glob, re
import argparse
import random
import hashlib
from uuid import uuid4
import collections

AUX_CONTACT_FILE = '/home/kerisman/Downloads/avalon_contacts.json'

SKIP_LIST = [
    'KurtCagleResume.docx.html.xml'
]

ns = { 'd':'http://ns.hr-xml.org/2007-04-15' } 

aux_contact_info = {}

def aux_contact_info():
    lines = []
    aux_contact_info = {}
    with open(AUX_CONTACT_FILE, 'r') as f:
        lines = f.read().split('\n')
    for l in lines:
        if(l):
            contact = eval(l)
            aux_contact_info[ contact['name'].replace(' ', '') ] = contact
    return aux_contact_info

#-------------
def userid(username):
    return hashlib.md5(username).hexdigest()

def transform_contact_info_for_resume( root, ns ):
    fn = root.find('.//d:ContactInfo/d:PersonName/d:GivenName', ns).text
    ln = root.find('.//d:ContactInfo/d:PersonName/d:FamilyName', ns).text
    email = root.find('.//d:ContactInfo/d:ContactMethod/d:InternetEmailAddress', ns).text

    username = (fn[0] + ln).lower()
    uid = userid(username)

    return { 'firstName': fn, 'lastName': ln, 'userId': uid }

def transform_contact_info_for_user( root, ns ):
    fn = root.find('.//d:ContactInfo/d:PersonName/d:GivenName', ns).text
    ln = root.find('.//d:ContactInfo/d:PersonName/d:FamilyName', ns).text

    username = (fn[0] + ln).lower()
    uid = userid(username)

    phone = root.find('.//d:ContactInfo/d:ContactMethod/d:Mobile', ns).text
    email = root.find('.//d:ContactInfo/d:ContactMethod/d:InternetEmailAddress', ns).text

    #FIXME: fake city
    city = fn + random.choice(('vale', 'burg', 'haven'))

    #FIXME: fake state
    state = random.choice(('IL', 'TN', 'SC', 'MN', 'OH', 'CO', 'TX'))

    #FIXME: fake zip
    zipcode = str(int(round(random.random() * 10**5)))

    #FIXME: placeholder timezone
    tz = '(GMT-06:00) Central Standard Time (America/Chicago)'

    #FIXME:merge contact info from avalon_contacts.json into what has already been found in the xml
    #   (this is ugly and complicated...just getting data ready for demo)
    key = fn + ln
    if(aux_contact_info.has_key(key)):
        phone = aux_contact_info[key]['phone']
        email = aux_contact_info[key]['email']
        tz = aux_contact_info[key]['timezone']

    return { 'userId': uid, 'username': username, 'firstName': fn, 'lastName': ln, 'phone': phone, 'email': email,
            'city': city, 'state': state, 'zip': zipcode, 'timezone': tz }

def desc_without_namespaces(desc):
    desc = re.sub( r'<Description xmlns:ns0=\"http://ns.hr-xml.org/2007-04-15\"', '', desc )
    return re.sub( r'ns0:', '', desc )

def transform_employment_history( root, ns ):
    eh = []
    for employer_org in root.findall('.//d:EmploymentHistory/d:EmployerOrg', ns):
        emp_name = employer_org.find('./d:EmployerOrgName', ns).text

        positions = []
        for position in employer_org.findall('./d:PositionHistory', ns):
            position_type = position.attrib['positionType']
            title = position.find('./d:Title', ns).text
            org_name = position.find('./d:OrganizationName', ns).text
            desc = position.find('./d:Description', ns)
            start_date = position.find('./d:StartDate', ns).text

            # generate a project id for the position (needed to link to a project)
            project_id = str(uuid4())

            # change description to HTML by removing namespaces

            # remove namespace in text of element tree, clean up
            desc_without_ns = desc_without_namespaces(ElementTree.tostring(desc))
            desc = re.sub( r'^\s+', '', desc_without_ns, flags = re.MULTILINE)
            # parse back into tree without the namespace
            t = ElementTree.fromstring(desc)
            html = ElementTree.tostring(t, method='html')
            t = ElementTree.fromstring(html)
            final_desc = ''
            for e in t.iter():
                if e.tag != 'Description':
                    final_desc += ElementTree.tostring(e, method='html')

            positions.append( { 'clientProjectId': project_id, 'positionType': position_type, 'title': title,
                'contractingOrgName': org_name, 'description': final_desc.replace('\n', ''),
                'startDate': start_date }
            )
        eh.append( { 'serviceProviderOrgName': emp_name, 'positions': positions } )

    return eh

def transform_education_history( root, ns):
    eh = []
    for school in root.findall('.//d:EducationHistory/d:SchoolOrInstitution', ns):
        school_name = school.find('./d:School/d:SchoolName', ns).text
        degree_name = school.find('./d:Degree/d:DegreeName', ns).text
        degree_major = school.find('./d:Degree/d:DegreeMajor/d:Name', ns).text
        start_date = school.find('./d:Degree/d:DatesOfAttendance/d:StartDate', ns).text

        eh.append( { 'schoolName': school_name, 'degreeName': degree_name,
            'degreeMajor': degree_major, 'startDate': start_date }
        )
    return eh

def transform_qualifications( root, ns):
    q = []
    for competency in root.findall('.//d:Qualifications/d:Competency', ns):
        display_name = competency.find('./d:CompetencyDisplayName', ns).text
        abbrev = competency.attrib['abbrev']
        years_exp = competency.find('./d:YearsExperience', ns).text

        q.append( { 'name': display_name, 'years': years_exp } )

    return q

# Generate a project for positions in each resume where OrganizationName doesn't match 'avalon consulting'
def generate_project( json_res ):
    userId = json_res['userId']
    projects_json = []
#FIXME: notice how I have to do employmentHistory[0][positions]? A recent change in the data structure means that employmentHistory no longer needs to be an array -- all it contains is positions. Need to fix this to make it cleaner but it will affect all the API code.
    positions = json_res['employmentHistory'][0]['positions']
    for position in positions:
        contractingOrgName = position['contractingOrgName']
        if contractingOrgName and contractingOrgName.startswith('Avalon Consulting'):
            pass
        else:
            description = position['description']
            startDate = position['startDate']
            title = position['title']
            projectId = position['clientProjectId']
        
            project_json = {
              "projectId": projectId,
              "clientName": contractingOrgName,
              "clientDescription": description,
              "clientWebsite": "www.company.com",
              "confidential": False,
              "name": "Project name",
              "startDate": startDate,
              "summary": "<p>Project summary.</p>",
              "clientContacts": [
                  {
                      "type": "business",
                      "firstName": "Hugo",
                      "lastName": "Suya",
                      "title": "Business director",
                      "cell": "222-222-2222",
                      "email": "hugosuya@company.com"
                  }
              ],
              "projectSkills": [
                  "Elasticsearch",
                  "Python",
                  "Flask",
                  "jQuery"
              ],
              "positions": [
                  {
                      "title": title,
                      "responsibilities": "Consulting",
                      "filledBy": [
                          {
                              "userId": userId,
                              "startDate": startDate,
                          }
                      ],
                      "positionSkills": [
                          "Elasticsearch",
                          "Python",
                          "Flask"
                      ]
                  }
              ]
            }
            projects_json.append(project_json)
    return projects_json

# Transform an XML resume into JSON and generate user and project JSON documents based on the resume.
# Returns an object with keys 'resume_json', 'user_json', and 'projects_json'.
def transform( xml_res, ns ):
    with open(xml_res, 'rt') as f:
        tree = ElementTree.parse(f)

    resume = transform_contact_info_for_resume( tree, ns )

    emp_hist = transform_employment_history( tree, ns )
    resume['employmentHistory'] = emp_hist

    edu_hist = transform_education_history( tree, ns )
    resume['educationHistory'] = edu_hist

    q = transform_qualifications( tree, ns )
    resume['skills'] = q

    user = transform_contact_info_for_user( tree, ns )

    # generate a fake project based on the first position in the JSON resume that was just generated
    projects = generate_project( resume )

    result = collections.namedtuple('result', ['resume_json', 'user_json', 'projects_json'])
    return result(resume, user, projects)
#-------------

#FIXME:
#   [v] generate a directory with subdirs {project, resume, user} and generate the project & user data
#   [v] user docs
#       - email goes in user doc; 'cell' in the xml becomes 'phone' in user doc
#       - for city, randomly choose one of ('vale', 'burg', 'haven') and append it to the firstname
#       - random zip; random state (one of IL,TN,SC,MN,OH,CO,TX)
#   [v] need to make userIds, put them in resumes and user docs (make these consistent)
#   [v] project docs need to have userId keys
#   [v] resume docs need to have clientProjectId keys
#

aux_contact_info = aux_contact_info()

parser = argparse.ArgumentParser(description='convert resume XML input to JSON')
parser.add_argument("indir", action='store',  help='existing directory containing XML input files')
parser.add_argument("outdir", action='store',  help='new directory to be created for JSON output files')
args = parser.parse_args()

os.chdir(args.indir)
res_filenames = glob.glob('*.xml')

# create output directory structure
os.mkdir(args.outdir)
resume_dir = os.path.join(args.outdir, 'resume')
os.mkdir( resume_dir )
user_dir = os.path.join(args.outdir, 'user')
os.mkdir( user_dir )
project_dir = os.path.join(args.outdir, 'project')
os.mkdir( project_dir )

for i in range( len(res_filenames) ):
    xml_res = res_filenames[i]
    if xml_res not in SKIP_LIST:
        result = transform(xml_res, ns)
    
        # Write data for resumes, users, and projects. Use filenames that can be used as the ids in ES for
        # the docs when indexed.

        resume_filename = str(uuid4()) + '.json'
        with open(os.path.join(resume_dir, resume_filename), 'w') as f:
            json.dump(result.resume_json, f, sort_keys=True, indent=4)
    
        user_filename = result.user_json['userId'] + '.json'
        with open(os.path.join(user_dir, user_filename), 'w') as f:
            json.dump(result.user_json, f, sort_keys=True, indent=4)
    
        if result.projects_json:
            project_filename = result.projects_json[0]['projectId'] + '.json'
            with open(os.path.join(project_dir, project_filename), 'w') as f:
                json.dump(result.projects_json[0], f, sort_keys=True, indent=4)

