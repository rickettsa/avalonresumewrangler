#!flask/bin/python
from flask import Flask, jsonify, request, abort, make_response
from flask.ext.cors import CORS
import json

from datalayer import DataLayer

app = Flask(__name__)
CORS(app)

dl = DataLayer.factory('Elasticsearch')

#-------

def _create_entity(creation_function, id=None):
    '''Look at the request object to find JSON in the body.
    From this, create a document in Elasticsearch. The provided creation
    function is used to create the document. This will determine the type
    of document created (resume, project, etc.).'''

    if request.headers['Content-Type'] == 'application/json':
        if not request.json:
            abort(400)

        jdata = json.loads(request.data)

        if not request.json:
            abort(400)

        entity = jdata

        if(id is None):
            id = creation_function(entity)
        else:
            creation_function(entity, id)

        return id

#------- Users

@app.route('/api/users', methods=['POST'])
def create_user():
    id = _create_entity(dl.create_or_update_user)
    return make_response('ok', 200, {'id': id} )

@app.route('/api/users/<id>', methods=['PUT'])
def update_user(id):
    _create_entity(dl.create_or_update_user, id)
    return ''

@app.route('/api/users/search', methods=['GET'])
def find_users():
    un = request.args.get('username')
    fn = request.args.get('firstname')
    ln = request.args.get('lastname')
    results = dl.find_users(username=un, firstname=fn, lastname=ln)
    return jsonify( results )

@app.route('/api/users', methods=['GET'])
def list_users():
    users = dl.list_users()
    return make_response( json.dumps(users), 200, {'Content-Type': 'application/json'} )

@app.route('/api/users/<id>', methods=['GET'])
def get_user(id):
    if len(id) == 0:
        abort(404)
    else:
        user = dl.get_user(id)
        return jsonify( user )

@app.route('/api/users/<id>', methods=['DELETE'])
def delete_user(id):
    dl.delete_user(id)
    return ''

#------- Resumes

@app.route('/api/resumes', methods=['POST'])
def create_resume():
    id = _create_entity(dl.create_or_update_resume)
    return ''

@app.route('/api/resumes/<id>', methods=['PUT'])
def update_resume(id):
    _create_entity(dl.create_or_update_resume, id)
    return ''

@app.route('/api/resumes', methods=['GET'])
def list_resumes():
    resumes = dl.list_resumes()
    return make_response( json.dumps(resumes), 200, {'Content-Type': 'application/json'} )

@app.route('/api/resumes/search', methods=['GET'])
def find_resumes():
    userid = request.args.get('userid')
    fn = request.args.get('firstname')
    ln = request.args.get('lastname')
    client_proj_id = request.args.get('client_project_id')
    skills = request.args.getlist('skill')

    results = dl.find_resumes(userid, fn, ln, client_proj_id, skills)

    # if expand_contact_info was provided then for each resume, find userId and call dl.get_user(id),
    # then add they key-value pairs from the user doc (assumed to be flat) inline to each resume
    expand_contact_info = request.args.get('expand_contact_info')
    if expand_contact_info:
        for r in results['hits']:
            res_data = r['_source']
            user = dl.get_user( res_data['userId'] )
            user_data = user['_source']
            for field in user_data.keys():
                res_data[field] = user_data[field]

    return jsonify( results )

@app.route('/api/resumes/<id>', methods=['GET'])
def get_resume(id):
    if len(id) == 0:
        abort(404)
    else:
        resume = dl.get_resume(id)
        return jsonify( resume )

@app.route('/api/resumes/<id>', methods=['DELETE'])
def delete_resume(id):
    dl.delete_resume(id)
    return ''

#------- Projects

@app.route('/api/projects', methods=['POST'])
def create_project():
    id = _create_entity(dl.create_or_update_project)
    return ''

@app.route('/api/projects/<id>', methods=['PUT'])
def update_project(id):
    _create_entity(dl.create_or_update_project, id)
    return ''

@app.route('/api/projects/search', methods=['GET'])
def find_projects():
    client_name = request.args.get('client_name')
    start_date_min = request.args.get('start_date_min')
    start_date_max = request.args.get('start_date_max')
    end_date_min = request.args.get('end_date_min')
    end_date_max = request.args.get('end_date_max')
    summary = request.args.get('summary')
    project_skills = request.args.getlist('project_skills')
    results = dl.find_projects( client_name, start_date_min, start_date_max, end_date_min, end_date_max, summary, project_skills )
    return jsonify( results )

@app.route('/api/projects/<id>', methods=['GET'])
def get_project(id):
    if len(id) == 0:
        abort(404)
    else:
        project = dl.get_project(id)
        return jsonify(project)

@app.route('/api/projects/<id>', methods=['DELETE'])
def delete_project(id):
    dl.delete_project(id)
    return ''

#-------

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)


if __name__ == '__main__':
    app.run(debug=True)

