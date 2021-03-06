
#
#   Load resume JSON into Elasticsearch
#
#   Usage: python load.py <path to input dir>
#
#   Input dir should be strucured as follows:
#
#   <root>/
#       user/       (contains *.json files, each representing a user)
#       resume/     (contains *.json files, each representing a resume)
#       project/    (contains *.json files, each representing a project)
#
#   ...where user, resume, and project are doc types. Those are the current valid doc types. Others may be added later.
#
import sys, os

if not os.environ["RW_GIT_BASE_DIR"] == "":
    GIT_BASE_DIR = os.environ["RW_GIT_BASE_DIR"]
else:
    GIT_BASE_DIR = '/home/kerisman/work/avalonresumewrangler'
AUX_CONTACT_FILE = GIT_BASE_DIR + '/data/avalon_contacts.json'

print "************************"
print "load.py running..."
print "Using System paths: "
print "GIT_BASE_DIR: %s" % GIT_BASE_DIR
print "************************"

DATALAYER_LIB_PATH = GIT_BASE_DIR + '/back-end/api/app/datalayer'

sys.path.append(DATALAYER_LIB_PATH)
from datalayer import DataLayer

USER_MAPPING = GIT_BASE_DIR + '/back-end/elasticsearch/mappings/user-mapping.json'
RESUME_MAPPING = GIT_BASE_DIR + '/back-end/elasticsearch/mappings/resume-mapping.json'
PROJECT_MAPPING = GIT_BASE_DIR + '/back-end/elasticsearch/mappings/project-mapping.json'
SKILL_MAPPING = GIT_BASE_DIR + '/back-end/elasticsearch/mappings/skill-mapping.json'

#-------
def delete_existing_data( datalayer ):
    datalayer.delete_index( datalayer.USER_INDEX )
    datalayer.delete_index( datalayer.RESUME_INDEX )
    datalayer.delete_index( datalayer.PROJECT_INDEX )
    datalayer.delete_index( datalayer.SKILL_INDEX )
    datalayer.delete_index( datalayer.STACK_INDEX )
    datalayer.delete_index( datalayer.STACK_POS_INDEX )

def create_new_indexes( datalayer ):
    datalayer.create_index( datalayer.USER_INDEX )
    datalayer.create_index( datalayer.RESUME_INDEX )
    datalayer.create_index( datalayer.PROJECT_INDEX )
    datalayer.create_index( datalayer.SKILL_INDEX )
    datalayer.create_index( datalayer.STACK_INDEX )
    datalayer.create_index( datalayer.STACK_POS_INDEX )

def create_new_mappings( datalayer ):
    with open(USER_MAPPING, 'r') as f:
        datalayer.create_mapping( f.read(), datalayer.USER_INDEX, datalayer.USER_TYPE )
    with open(RESUME_MAPPING, 'r') as f:
        datalayer.create_mapping( f.read(), datalayer.RESUME_INDEX, datalayer.RESUME_TYPE )
    with open(PROJECT_MAPPING, 'r') as f:
        datalayer.create_mapping( f.read(), datalayer.PROJECT_INDEX, datalayer.PROJECT_TYPE )
    with open(SKILL_MAPPING, 'r') as f:
        datalayer.create_mapping( f.read(), datalayer.SKILL_INDEX, datalayer.SKILL_TYPE )
#-------

dl = DataLayer.factory( 'Elasticsearch' )

# verify that the subdirectories of the input dir are named after each doc type
input_dir = sys.argv[1]
doc_type_subdirs = [o for o in os.listdir(input_dir) if os.path.isdir(os.path.join(input_dir, o))]
if sorted( doc_type_subdirs ) != sorted( dl.VALID_DOC_TYPES ):
    raise ValueError( 'Input directory should have exactly these subdirectories: ' + str(dl.VALID_DOC_TYPES) )

print 'deleting existing data...'
delete_existing_data( dl )
print 'creating new indexes...'
create_new_indexes( dl )
print 'creating new mappings...'
create_new_mappings( dl )

# load documents by type in each of the doc type subdirs
for root, dirs, files in os.walk( input_dir ):
    doc_type = os.path.basename(root)
    if doc_type in dl.VALID_DOC_TYPES:                      # skip input dir root
        print 'indexing docs of type', doc_type, '...'
        json_docs = [f for f in files if f[-5:] == '.json'] # skip non-json files
        for doc in json_docs:
            # ids are expected to be in filenames (e.g. a23b4cd7a.json)
            id = doc[:-5]
            with open(os.path.join(input_dir, doc_type, doc), 'r') as f:
                print 'indexing', doc_type, 'from file', doc, '...'
                dl.create_or_update_doc( f.read(), doc_type, id )

print "************************"
print "load.py completed successfully!"
print "************************"
