from datalayer import DataLayer

from elasticsearch import Elasticsearch, exceptions

#-------

# Combine several "must" queries into a bool query
def bool_query( must_queries ):
    return {
        'query': {
            'bool': { 'must': must_queries }
        }
    }

def filtered_term_query(term, value): return { 'filtered': { 'filter': { 'term': { term: value } } } }

#FIXME: change 'Competency' to 'Skill' or 'Skills'
def nested_query(s):
    return { 'nested': {
            'path': 'Competency',
            'query': {
                'match': { 'Competency.name': s }
            }
        }
    }

#-------

class ESDataLayer(DataLayer):
    '''A data layer for Elasticsearch.'''

    RESUME_INDEX = 'resumes'
    RESUME_TYPE = 'resume'

    PROJECT_INDEX = 'projects'
    PROJECT_TYPE = 'project'

    USER_INDEX = 'users'
    USER_TYPE = 'user'

    def __init__(self):
        self.es = Elasticsearch()

    def create_index(self):
        self.es.indices.create(index=self.RESUME_INDEX)

    def create_mapping(self, mapping):
        self.es.indices.put_mapping(index=self.RESUME_INDEX, doc_type=self.RESUME_TYPE, body=mapping)

    #------- Users

    def create_or_update_user(self, user, id=None):
        doc_id = None
        if id is None:
            doc_id = DataLayer.uuid()
        else:
            doc_id = id

        self.es.index(index=self.USER_INDEX, doc_type=self.USER_TYPE, body=user, id=doc_id)
        return doc_id

    def list_users(self):
        #FIXME:support pagination or figure out a better way to get all results
        users = self.es.search(index=self.USER_INDEX, doc_type=self.USER_TYPE, size=999999999)
        return [ u for u in users['hits']['hits'] ]

    def find_users(self, username, firstname, lastname):
        un_query = fn_query = ln_query = None
        if username is not None: un_query = filtered_term_query( 'username', username.lower() )
        if firstname is not None: fn_query = filtered_term_query( 'firstName', firstname.lower() )
        if lastname is not None: ln_query = filtered_term_query( 'lastName', lastname.lower() )
        queries = filter( lambda q: q is not None, [un_query, fn_query, ln_query] )
        combined_query = bool_query( queries )
        return self.es.search(index=self.USER_INDEX, doc_type=self.USER_TYPE, body=combined_query)['hits']

    def get_user(self, id):
        user = self.es.get(index=self.USER_INDEX, doc_type=self.USER_TYPE, id=id)
        return user

    def delete_user(self, id):
        self.es.delete(index=self.USER_INDEX, doc_type=self.USER_TYPE, id=id)

    #------- Resumes

    def create_or_update_resume(self, resume, id=None):
        # Generate UUID for new resume: default to DataLayer's UUID but allow caller to
        # pass in a custom UUID. Doing it this way instead of using named args because
        # DataLayer.uuid() needs to be called again for every call to create_resume()
        doc_id = None
        if id is None:
            doc_id = DataLayer.uuid()
        else:
            doc_id = id

        self.es.index(index=self.RESUME_INDEX, doc_type=self.RESUME_TYPE, body=resume, id=doc_id)
        return doc_id

    def list_resumes(self):
        #FIXME:
        # - hard coding a magic number for now; need to either support paging or find out the proper way to get all results
        # - is "list resume" functionality even needed?
        resumes = self.es.search(index=self.RESUME_INDEX, doc_type=self.RESUME_TYPE, size=999999999, _source=False)
        return [ r for r in resumes['hits']['hits'] ]

    #NOTE: using variable.lower() in much of this code because ES mapping stores lowercased text in many cases as part of its normalization
    # (there may be better ways to index the data or other query types to use that don't require this step)

    def find_resumes(self, firstname, lastname, skills=[]):
        fn_query = ln_query = None
        if firstname is not None: fn_query = filtered_term_query( 'firstName', firstname.lower() )
        if lastname is not None: ln_query = filtered_term_query( 'lastName', lastname.lower() )
        skill_queries = [ nested_query( s.lower() ) for s in skills ] or None
        queries = filter( lambda q: q is not None, [fn_query, ln_query, skill_queries] )
        combined_query = bool_query( queries )
        return self.es.search(index=self.RESUME_INDEX, doc_type=self.RESUME_TYPE, body=combined_query)['hits']

    def get_resume(self, id):
        resume = self.es.get(index=self.RESUME_INDEX, doc_type=self.RESUME_TYPE, id=id)
        return resume

    def delete_resume(self, id):
        self.es.delete(index=self.RESUME_INDEX, doc_type=self.RESUME_TYPE, id=id)

    #------- Projects

    def create_or_update_project(self, project, id=None):
        doc_id = None
        if id is None:
            doc_id = DataLayer.uuid()
        else:
            doc_id = id

        self.es.index(index=self.PROJECT_INDEX, doc_type=self.PROJECT_TYPE, body=project, id=doc_id)
        return doc_id

    def find_projects(self, client_name, start_date_min, start_date_max, end_date_min, end_date_max, summary, project_skills):
        skill_queries = []
        for s in project_skills:
            skill_queries += [ { "match": { "projectSkills": s } } ]
        if len(skill_queries) == 0:
            skill_queries = None

        client_name_query = start_date_query = end_date_query = summary_query = None
        if client_name is not None:
            client_name_query = { "match": {
               "clientName": client_name
            }}
        if start_date_min is not None and start_date_max is not None:
            start_date_query = { "range": {
               "startDate": {
                  "from": start_date_min,
                  "to": start_date_max
               }
            }}
        elif start_date_min is not None:
            start_date_query = { "range": {
               "startDate": {
                  "from": start_date_min,
               }
            }}
        elif start_date_max is not None:
            start_date_query = { "range": {
               "startDate": {
                  "to": start_date_max
               }
            }}
        if end_date_min is not None and end_date_max is not None:
            end_date_query = { "range": {
               "endDate": {
                  "from": end_date_min,
                  "to": end_date_max
               }
            }}
        elif end_date_min is not None:
            end_date_query = { "range": {
               "endDate": {
                  "from": end_date_min,
               }
            }}
        elif end_date_max is not None:
            end_date_query = { "range": {
               "endDate": {
                  "to": end_date_max
               }
            }}
        if summary is not None:
            summary_query = { "match_phrase": {
               "summary": summary
            }}
        must_queries = filter( lambda x: x is not None, [ client_name_query, start_date_query, end_date_query, summary_query, skill_queries ] )
        project_query = bool_query( must_queries )
        return self.es.search(index=self.PROJECT_INDEX, doc_type=self.PROJECT_TYPE, body=project_query)['hits']

    def get_project(self, id):
        project = self.es.get(index=self.PROJECT_INDEX, doc_type=self.PROJECT_TYPE, id=id)
        return project

    def delete_project(self, id):
        self.es.delete(index=self.PROJECT_INDEX, doc_type=self.PROJECT_TYPE, id=id)

    #-------

    def delete_index(self):
        self.es.indices.delete(self.RESUME_INDEX, ignore=[400, 404])


if __name__ == '__main__':
    dl = DataLayer.factory( 'Elasticsearch' )
    print(dl)
    print(dl.es)
    print 'index: ', dl.RESUME_INDEX
    print 'type: ', dl.RESUME_TYPE
    try:
        print 'resumes: ', dl.list_resumes()
    except exceptions.NotFoundError:
        print '(index missing)'
#    print dl.get_resume('AU76Hwu_NXud7rAthNR8')
#    dl.create_resume('r')

