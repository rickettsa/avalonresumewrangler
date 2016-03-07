
#
#   Load skills JSON into Elasticsearch
#
#   Usage: python import-skills.py <path to input file containing skills>
#
import sys, json, os

if not os.environ["RW_GIT_BASE_DIR"] == "":
    GIT_BASE_DIR = os.environ["RW_GIT_BASE_DIR"]
else:
    GIT_BASE_DIR = '/home/kerisman/work/avalonresumewrangler'
AUX_CONTACT_FILE = GIT_BASE_DIR + '/data/avalon_contacts.json'

print "************************"
print "import_skills.py running..."
print "Using System paths: "
print "GIT_BASE_DIR: %s" % GIT_BASE_DIR
print "AUX_CONTACT_FILE: %s" % AUX_CONTACT_FILE
print "************************"

DATALAYER_LIB_PATH = GIT_BASE_DIR + '/back-end/api/app/datalayer'

sys.path.append(DATALAYER_LIB_PATH)
from datalayer import DataLayer

#-------

dl = DataLayer.factory( 'Elasticsearch' )

skills_file = sys.argv[1]

skills_container = {}
with open(skills_file, 'r') as f:
    skills_container = json.load(f)

skills = skills_container['skills']

for k in skills.keys():
    print 'adding skill:', skills[k]['dispName'] + '...'
    skill = skills[k]
    dl.create_or_update_skill(skill, k)

print "************************"
print "import_skills.py completed successfully!"
print "************************"