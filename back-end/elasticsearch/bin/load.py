
#
#   Load resume JSON into Elasticsearch
#
#   Usage: python load.py <path to dir with JSON resume files to load>
#
import sys, os

DATALAYER_LIB_PATH = '/home/kerisman/work/avalonresumewrangler/back-end/api/app/datalayer'
MAPPING = '/home/kerisman/work/avalonresumewrangler/back-end/elasticsearch/bin/mapping.json'

#-------

sys.path.append(DATALAYER_LIB_PATH)
from datalayer import DataLayer

input_dir = sys.argv[1]
input_files = os.listdir( input_dir )

dl = DataLayer.factory( 'Elasticsearch' )

# Delete existing data
dl.delete_index()

# Create new index and mapping
dl.create_index()
with open(MAPPING, 'r') as f:
    dl.create_mapping(f.read())

# Load data
for filename in input_files:
    with open(os.path.join(input_dir, filename), 'r') as f:
        print 'creating resume from file ', filename, '...'
        dl.create_resume(f.read())

