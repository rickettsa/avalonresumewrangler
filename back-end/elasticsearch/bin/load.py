
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

DATALAYER_LIB_PATH = '/home/kerisman/work/avalonresumewrangler/back-end/api/app/datalayer'

sys.path.append(DATALAYER_LIB_PATH)
from datalayer import DataLayer

RESUME_MAPPING = '/home/kerisman/work/avalonresumewrangler/back-end/elasticsearch/mappings/resume-mapping.json'
PROJECT_MAPPING = '/home/kerisman/work/avalonresumewrangler/back-end/elasticsearch/mappings/project-mapping.json'

#-------

def delete_existing_data( datalayer ):
    datalayer.delete_index( datalayer.USER_INDEX )
    datalayer.delete_index( datalayer.RESUME_INDEX )
    datalayer.delete_index( datalayer.PROJECT_INDEX )

def create_new_indexes( datalayer ):
    datalayer.create_index( datalayer.USER_INDEX )
    datalayer.create_index( datalayer.RESUME_INDEX )
    datalayer.create_index( datalayer.PROJECT_INDEX )

def create_new_mappings( datalayer ):
    with open(RESUME_MAPPING, 'r') as f:
        datalayer.create_mapping( f.read(), datalayer.RESUME_INDEX, datalayer.RESUME_TYPE )
    with open(PROJECT_MAPPING, 'r') as f:
        datalayer.create_mapping( f.read(), datalayer.PROJECT_INDEX, datalayer.PROJECT_TYPE )
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
#FIXME:this takes id from filename (e.g. a23b4cd7a.json). That's useful for sample data but
#   real data we'll load won't use this naming scheme. Maybe this script could take an option
#   like --ids-from-filenames or something
            id = doc[:-5]
            with open(os.path.join(input_dir, doc_type, doc), 'r') as f:
                print 'indexing', doc_type, 'from file', doc, '...'
                dl.create_or_update_doc( f.read(), doc_type, id )

