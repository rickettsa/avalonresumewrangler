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

#
# Search for resumes
#   GET http://localhost:5000/api/resumes/search?lastname=mefford&skill=java&skill=python
#
#FIXME: add search by project
#
#FIXME: improvements
#   - full text search with scoring
#   - pagination
#   - sorting, faceting, etc.
#   - snippet highlighting?
#
@app.route('/api/resumes/search', methods=['GET'])
def find_resumes():
    fn = request.args.get('firstname')
    ln = request.args.get('lastname')
    skills = request.args.getlist('skill')
    results = dl.find_resumes(firstname=fn, lastname=ln, skills=skills)
    return jsonify( results )

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

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)


if __name__ == '__main__':
    app.run(debug=True)

