
#
#   Load skills JSON into Elasticsearch
#
#   Usage: python import-skills.py <path to input file containing skills>
#
import sys, json

#GIT_BASE_DIR = '/Volumes/Macintosh HD/Users/abembecker/Development/Avalon/resumeWrangler/BeanStalk_AvalonResumeWrangler'
GIT_BASE_DIR = '/home/kerisman/work/avalonresumewrangler'

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

