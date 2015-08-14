#!flask/bin/python
from flask import Flask, jsonify, request, abort, make_response
import json

from datalayer import DataLayer

ES_INDEX = 'resumes'
RESUME_TYPE = 'resume'

app = Flask(__name__)

dl = DataLayer.factory('Elasticsearch')

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
            dl.create_resume(resume, id)
        else:
            dl.create_resume(resume)
        
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
    resumes = dl.list_resumes()
    return jsonify( resumes )

# Get a specific resume
#   GET http://localhost:5000/api/resumes/AU2W0hYTw_8sJsjY6vi8
#
@app.route('/api/resumes/<id>', methods=['GET'])
def get_resume(id):
    resume = dl.get_resume(id)
    if len(id) == 0:
        abort(404)
    return jsonify( resume )

# Delete a specific resume
#   DELETE http://localhost:5000/api/resume/AU2W0hYTw_8sJsjY6vi8
#
@app.route('/api/resumes/<id>', methods=['DELETE'])
def delete_resume(id):
    dl.delete_resume(id)
    return ''

#-------

#FIXME: need to define requirements for search function
# Minimal requirements to start with:
#   - resumes that mention a particular skill/skill set
#   - resumes that mention a particular project
#   - find resumes by person name
#
# Other possibilities:
#   - full text search
#   - [search by name, skills, ...]
#   - support pagination
#   - support sorting by specified field
#   - support facets??? how is this supposed to work?
#   - (later: highlighted search snippets)

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

