#!flask/bin/python
from flask import Flask, jsonify, request, abort, make_response
from elasticsearch import Elasticsearch
import json

ES_INDEX = 'resumes'
RESUME_TYPE = 'resume'

app = Flask(__name__)
es = Elasticsearch()

#-------

#
#   FIXME: need to make a more elaborate plan (but maybe not
#   immediately)...need a superclass with a factory method to instantiate
#   abstract subclasses for ES/ML. The subclasses will override functions in
#   the superclass to maintain the interface; they will return the data needed
#   by the API. The superclass will probably be the one with the flask routing.
#   The subclasses will just have functions like create_resume, get_resume,
#   etc. to interact with the data store.
#
#   For now, just support ES
#

#-------

def _create_resume(id=None):
    if request.headers['Content-Type'] == 'application/json':
        if not request.json:
            abort(400)

        jdata = json.loads(request.data)

        if not request.json:
            abort(400)

        resume = jdata

        if(id is not None):
            es.index(index=ES_INDEX, doc_type=RESUME_TYPE, body=resume, id=id)
        else:
            es.index(index=ES_INDEX, doc_type=RESUME_TYPE, body=resume)
        
        return ''

# Create a resume
#   POST http://localhost:5000/api/resumes
#
@app.route('/api/resumes', methods=['POST'])
def create_resume():
    return _create_resume()

# Update a resume
#   PUT http://localhost:5000/api/resumes/AU2W0hYTw_8sJsjY6vi8
#
@app.route('/api/resumes/<id>', methods=['PUT'])
def update_resume(id):
    return _create_resume(id)

# List resumes
#   GET http://localhost:5000/api/resumes/
#
@app.route('/api/resumes', methods=['GET'])
def list_resumes():
    resumes = es.search(index=ES_INDEX, doc_type=RESUME_TYPE)
    return jsonify( resumes )

# Get a specific resume
#   GET http://localhost:5000/api/resumes/AU2W0hYTw_8sJsjY6vi8
#
@app.route('/api/resumes/<id>', methods=['GET'])
def get_resume(id):
    resume = es.get(index=ES_INDEX, doc_type=RESUME_TYPE, id=id)
    if len(id) == 0:
        abort(404)
    return jsonify( resume )

# Delete a specific resume
#   DELETE http://localhost:5000/api/resume/AU2W0hYTw_8sJsjY6vi8
#
@app.route('/api/resumes/<id>', methods=['DELETE'])
def delete_resume(id):
    es.delete(index=ES_INDEX, doc_type=RESUME_TYPE, id=id)
    return ''

#-------

#FIXME: need to define requirements for search function
# IDEAS:
#   - full text search
#   - [search by name, skills, ...]
#   - support pagination
#   - support sorting by specified field
#   - support facets??? how is this supposed to work?
#   - (later: highlighted search snippets)

#   - [format: do we need to support anything other than json?]
#   - structure: just a list of resumes wrapped in "ResumeSearchResults"

# Search for resumes
#   GET http://localhost:5000/api/resume/search?...
#@app.route('/api/resumes/search')
#def search(...):
#    ...

#-------

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)


if __name__ == '__main__':
    app.run(debug=True)
