#!flask/bin/python
from flask import Flask, jsonify, request, abort, make_response
from flask.ext.cors import CORS
import json

from datalayer import DataLayer

app = Flask(__name__)
CORS(app)

dl = DataLayer.factory('Elasticsearch')

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE')
    return response

#-------

def _create_entity(creation_function, id=None):
    '''Look at the request object to find JSON in the body.
    From this, create a document in Elasticsearch. The provided creation
    function is used to create the document. This will determine the type
    of document created (resume, project, etc.).'''

    content_type = request.headers['Content-Type'].split(';')[0] # ignore possible charset

    if content_type == 'application/json':
        if not request.json:
            abort(400)

        jdata = json.loads(request.data)

        entity = jdata

        if(id is None):
            id = creation_function(entity)
        else:
            creation_function(entity, id)

        return id
    else:
        raise Exception('Wrong Content-Type header; must be application/json')

#------- Users

@app.route('/api/users', methods=['POST'])
def create_user():
    user_data = json.loads(request.data)

    # verify that no user with this email or username already exists
    users_with_email = dl.find_users(email=user_data['email'])
    users_with_username = dl.find_users(username=user_data['username'])
    errors = []
    if users_with_email['total'] > 0:
        errors.append('email already taken')
    elif users_with_email['total'] > 1:
        make_response('Internal server error', 500)

    if users_with_username['total'] > 0:
        errors.append('username already taken')
    elif users_with_username['total'] > 1:
        make_response('Internal server error', 500)

    if errors:
        return make_response('Bad request: ' + '; '.join(errors), 400)
    else:
        id = _create_entity(dl.create_or_update_user)

        # add userId to user doc
        user_data['userId'] = str(id)
        dl.create_or_update_user(user_data, id)

        return jsonify( {'id': str(id)} )

# OPTIONS needed for AngularJS
@app.route('/api/users', methods=['OPTIONS'])
def create_user__options():
    return make_response('ok', 200)

@app.route('/api/users/<id>', methods=['PUT'])
def update_user(id):
    user = None
    try:
        user = dl.get_user(id)
    except Exception as e:
        if e.args[0] == 'NotFoundError':
            abort(404)
        else:
            raise
    user_data = json.loads(request.data)

    # verify that this is not an attempt to change email address or username to that of another existing user
    users_with_email = dl.find_users(email=user_data['email'])
    users_with_username = dl.find_users(username=user_data['username'])
    errors = []
    if users_with_email['total'] > 0:
        existing_user_data = users_with_email['hits'][0]['_source']
        if existing_user_data['email'] == user_data['email'] and existing_user_data['userId'] != id:
            errors.append('there is another user with this email address')
    elif users_with_email['total'] > 1:
        make_response('Internal server error', 500)

    if users_with_username['total'] > 0:
        existing_user_data = users_with_username['hits'][0]['_source']
        if existing_user_data['username'] == user_data['username'] and existing_user_data['userId'] != id:
            errors.append('there is another user with this username')
    elif users_with_username['total'] > 1:
        make_response('Internal server error', 500)

    if errors:
        return make_response('Bad request: ' + '; '.join(errors), 400)

    # Preserve the userId in the user doc by inserting it into the request data before the update is performed
    user_data["userId"] = id
    request.data = json.dumps(user_data)
    _create_entity(dl.create_or_update_user, id)
    return ''

# OPTIONS needed for AngularJS
@app.route('/api/users/<id>', methods=['OPTIONS'])
def update_user__options(id):
    return make_response('ok',200)

@app.route('/api/users/search', methods=['GET'])
def find_users():
    un = request.args.get('username')
    fn = request.args.get('firstname')
    ln = request.args.get('lastname')
    email = request.args.get('email')
    results = dl.find_users(username=un, firstname=fn, lastname=ln, email=email)
    return jsonify( results )

@app.route('/api/users', methods=['GET'])
def list_users():
    users = dl.list_users()
    return make_response( json.dumps(users), 200, {'Content-Type': 'application/json'} )

@app.route('/api/users/<id>', methods=['GET'])
def get_user(id):
    try:
        user = dl.get_user(id)
    except Exception as e:
        if e.args[0] == 'NotFoundError':
            abort(404)
        else:
            raise
    return jsonify( user )

@app.route('/api/users/<id>', methods=['DELETE'])
def delete_user(id):
    try:
        dl.delete_user(id)
    except Exception as e:
        if e.args[0] == 'NotFoundError':
            abort(404)
        else:
            raise
    return ''

#------- Resumes

@app.route('/api/resumes', methods=['POST'])
def create_resume():
    id = _create_entity(dl.create_or_update_resume)
    return jsonify({ 'id': str(id) })

# OPTIONS needed for AngularJS
@app.route('/api/resumes', methods=['OPTIONS'])
def create_resume__options():
    return make_response('ok', 200)

@app.route('/api/resumes/<id>', methods=['PUT'])
def update_resume(id):
    try:
        dl.get_resume(id)
    except Exception as e:
        if e.args[0] == 'NotFoundError':
            abort(404)
        else:
            raise

    _create_entity(dl.create_or_update_resume, id)

    return ''

# OPTIONS needed for AngularJS
@app.route('/api/resumes/<id>', methods=['OPTIONS'])
def update_resume__options(id):
    return make_response('ok', 200)

def _expanded_resume(resume):
    user = dl.get_user( resume['userId'] )
    user_data = user['_source']
    for field in user_data.keys():
        resume[field] = user_data[field]
    return resume

@app.route('/api/resumes', methods=['GET'])
def list_resumes():
    resumes = dl.list_resumes()
    return make_response( json.dumps(resumes), 200, {'Content-Type': 'application/json'} )

def _matches_one_of(r, l):
    '''If string s is in list l (case-insensitive match), return True. False otherwise.'''
    if len(l) > 0:
        if l[0].lower() == r.lower():
            return True
        else:
            return _matches_one_of(r, l[1:])
    return False

@app.route('/api/resumes/search', methods=['GET'])
def find_resumes():
    userid = request.args.get('userid')
    fn = request.args.get('firstname')
    ln = request.args.get('lastname')
    client_proj_id = request.args.get('client_project_id')
    skills = request.args.getlist('skill')

    results = dl.find_resumes(userid, fn, ln, client_proj_id, skills)

    # for each resume, re-order the skills section to show the searched skill(s) first
    for r in results['hits']:
        res_data = r['_source']
        skills_section = res_data['skills']
        prioritized_skills = []
        for i in range( 0, len(skills_section) ):
            skill_name = skills_section[i]['name']
            # if skill_name matches one of the searched skills then insert at front of priority list; otherwise append to back
            if _matches_one_of(skill_name, skills):
                prioritized_skills.insert(0, skills_section[i])
            else:
                prioritized_skills.append(skills_section[i])

        res_data['skills'] = prioritized_skills

    # if expand_user_info was provided, add info from user docs inline to each resume
    expand_user_info = request.args.get('expand_user_info')
    if expand_user_info:
        for r in results['hits']:
            res_data = r['_source']
            r['_source'] = _expanded_resume(res_data)

    return jsonify( results )

@app.route('/api/resumes/<id>', methods=['GET'])
def get_resume(id):
    resume = None
    exclude_sections = request.args.getlist('exclude_sections')
    try:
        resume = dl.get_resume(id, exclude_sections)
    except Exception as e:
        if e.args[0] == 'NotFoundError':
            abort(404)
        else:
            raise

    target_stacks = request.args.getlist('filter_stack')
    if target_stacks:
        resume = dl.resume_with_filtered_positions(resume, target_stacks, skill_meta_key='stackNames')

    target_stack_positions = request.args.getlist('filter_stackpos')
    if target_stack_positions:
        resume = dl.resume_with_filtered_positions(resume, target_stack_positions, skill_meta_key='stackPositions')

    expand_user_info = request.args.get('expand_user_info')
    if expand_user_info:
        res_data = resume['_source']
        resume['_source'] = _expanded_resume(res_data)

    return jsonify( resume )

@app.route('/api/resumes/<id>', methods=['DELETE'])
def delete_resume(id):
    try:
        dl.delete_resume(id)
    except Exception as e:
        if e.args[0] == 'NotFoundError':
            abort(404)
        else:
            raise
    return ''

#------- Projects

@app.route('/api/projects', methods=['POST'])
def create_project():
    id = _create_entity(dl.create_or_update_project)
    return ''

# OPTIONS needed for AngularJS
@app.route('/api/projects', methods=['OPTIONS'])
def create_project__options():
    return make_response('ok', 200)

@app.route('/api/projects/<id>', methods=['PUT'])
def update_project(id):
    try:
        dl.get_project(id)
    except Exception as e:
        if e.args[0] == 'NotFoundError':
            abort(404)
        else:
            raise
    _create_entity(dl.create_or_update_project, id)
    return ''

# OPTIONS needed for AngularJS
@app.route('/api/projects/<id>', methods=['OPTIONS'])
def update_project__options(id):
    return make_response('ok', 200)

def _expanded_project(project):
    positions = project['positions']
    for i in range(len(positions)):
        users_filling_position = positions[i]['filledBy']
        for j in range(len(users_filling_position)):
            if users_filling_position[j].has_key('userId'):
                user = dl.get_user( users_filling_position[j]['userId'] )
                user_data = user['_source']
                # put fields from user_data under filledBy as siblings to userId
                for field in user_data.keys():
                    project['positions'][i]['filledBy'][j][field] = user_data[field]
    return project


@app.route('/api/projects', methods=['GET'])
def list_projects():
    projects = dl.list_projects()
    return make_response( json.dumps(projects), 200, {'Content-Type': 'application/json'} )

@app.route('/api/projects/search', methods=['GET'])
def find_projects():
    q = request.args.get('q')
    client_name = request.args.get('client_name')
    start_date_min = request.args.get('start_date_min')
    start_date_max = request.args.get('start_date_max')
    end_date_min = request.args.get('end_date_min')
    end_date_max = request.args.get('end_date_max')
    summary = request.args.get('summary')
    project_skills = request.args.getlist('project_skills')

    results = dl.find_projects( client_name, start_date_min, start_date_max,
        end_date_min, end_date_max, summary, project_skills, q )

    # if expand_user_info was provided, add info from user docs inline to each resume
    expand_user_info = request.args.get('expand_user_info')
    if expand_user_info:
        for r in results['hits']:
            proj_data = r['_source']
            r['_source'] = _expanded_project(proj_data)

    return jsonify( results )

@app.route('/api/projects/<id>', methods=['GET'])
def get_project(id):
    project = None
    try:
        project = dl.get_project(id)
    except Exception as e:
        if e.args[0] == 'NotFoundError':
            abort(404)
        else:
            raise
    expand_user_info = request.args.get('expand_user_info')
    if expand_user_info:
        proj_data = project['_source']
        project['_source'] = _expanded_project(proj_data)
    return jsonify(project)

@app.route('/api/projects/<id>', methods=['DELETE'])
def delete_project(id):
    try:
        dl.delete_project(id)
    except Exception as e:
        if e.args[0] == 'NotFoundError':
            abort(404)
        else:
            raise
    return ''

#------- Skills

@app.route('/api/skills', methods=['GET'])
def get_skills():
    skills = dl.list_skills()
    skill_objects = {}
    for s in skills:
        skill_id = s['_id']
        skill_obj = s['_source']
        skill_obj['id'] = skill_id
        skill_objects[skill_id] = skill_obj
    output_skills = { 'skills': skill_objects }
    return make_response( json.dumps(output_skills), 200, {'Content-Type': 'application/json'} )

@app.route('/api/skills/<id>', methods=['PUT'])
def create_or_update_skill(id):
    _create_entity(dl.create_or_update_skill, id)
    return ''

# OPTIONS needed for AngularJS
@app.route('/api/skills/<id>', methods=['OPTIONS'])
def create_or_update_skill__options(id):
    return make_response('ok', 200)

@app.route('/api/skills/<id>', methods=['DELETE'])
def delete_skill(id):
    try:
        dl.delete_skill(id)
    except Exception as e:
        if e.args[0] == 'NotFoundError':
            abort(404)
        else:
            raise
    return ''

#------- Stacks

@app.route('/api/stacks', methods=['GET'])
def get_stacks():
    stacks = dl.list_stacks()
    stack_objects = {}
    for s in stacks:
        stack_id = s['_id']
        stack_obj = s['_source']
        stack_obj['id'] = stack_id
        stack_objects[stack_id] = stack_obj
    output_stacks = { 'stacks': stack_objects }
    return make_response( json.dumps(output_stacks), 200, {'Content-Type': 'application/json'} )

@app.route('/api/stacks/<id>', methods=['PUT'])
def create_or_update_stack(id):
    _create_entity(dl.create_or_update_stack, id)
    return ''

# OPTIONS needed for AngularJS
@app.route('/api/stacks/<id>', methods=['OPTIONS'])
def create_or_update_stack__options(id):
    return make_response('ok', 200)

@app.route('/api/stacks/<id>', methods=['DELETE'])
def delete_stack(id):
    try:
        dl.delete_stack(id)
    except Exception as e:
        if e.args[0] == 'NotFoundError':
            abort(404)
        else:
            raise
    return ''

#------- Stack Positions

@app.route('/api/stack-positions', methods=['GET'])
def get_stack_positions():
    stack_positions = dl.list_stack_positions()
    stackpos_objects = {}
    for s in stack_positions:
        stackpos_id = s['_id']
        stackpos_obj = s['_source']
        stackpos_obj['id'] = stackpos_id
        stackpos_objects[stackpos_id] = stackpos_obj
    output_stackpos = { 'positions': stackpos_objects }
    return make_response( json.dumps(output_stackpos), 200, {'Content-Type': 'application/json'} )

@app.route('/api/stack-positions/<id>', methods=['PUT'])
def create_or_update_stack_position(id):
    _create_entity(dl.create_or_update_stack_position, id)
    return ''

# OPTIONS needed for AngularJS
@app.route('/api/stack-positions/<id>', methods=['OPTIONS'])
def create_or_update_stack_positions__options(id):
    return make_response('ok', 200)

@app.route('/api/stack-positions/<id>', methods=['DELETE'])
def delete_stack_position(id):
    try:
        dl.delete_stack_position(id)
    except Exception as e:
        if e.args[0] == 'NotFoundError':
            abort(404)
        else:
            raise
    return ''

#-------

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)


if __name__ == '__main__':
    app.run(host='192.168.33.10',debug=True)

