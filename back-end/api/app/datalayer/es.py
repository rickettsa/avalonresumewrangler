from datalayer import DataLayer

from elasticsearch import Elasticsearch, exceptions

#-------

# Combine the given "must" queries into a bool query
def bool_query( must_queries ):
    return {
        'query': {
            'bool': { 'must': must_queries }
        }
    }

def filtered_term_query(term, value): return { 'filtered': { 'filter': { 'term': { term: value } } } }

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

    def __init__(self):
        self.es = Elasticsearch()

    def create_index(self):
        self.es.indices.create(index=self.RESUME_INDEX)

    def create_mapping(self, mapping):
        self.es.indices.put_mapping(index=self.RESUME_INDEX, doc_type=self.RESUME_TYPE, body=mapping)

    def create_resume(self, resume, id=None):
        # Generate UUID for new resume: default to DataLayer's UUID but allow caller to
        # pass in a custom UUID. Doing it this way instead of using named args because
        # DataLayer.uuid() needs to be called again for every call to create_resume()
        uuid = None
        if id is None:
            uuid = DataLayer.uuid()
        else:
            uuid = id

        self.es.index(index=self.RESUME_INDEX, doc_type=self.RESUME_TYPE, body=resume, id=uuid)

    def update_resume(self, resume, id):
        self.create_resume(resume, id)

    def list_resumes(self):
        resumes = self.es.search(index=self.RESUME_INDEX, doc_type=self.RESUME_TYPE)['hits']
        return resumes

#NOTE: using variable.lower() in much of this code because ES mapping stores lowercased text in many cases as part of its normalization

    def find_resumes(self, firstname, lastname, skills=[]):
        fn_query = ln_query = None
        if firstname is not None: fn_query = filtered_term_query( 'firstName', firstname.lower() )
        if lastname is not None: ln_query = filtered_term_query( 'lastName', lastname.lower() )
        skill_queries = [ nested_query( s.lower() ) for s in skills ] or None
        queries = filter( lambda q: q is not None, [fn_query, ln_query, skill_queries] )
        combined_query = bool_query( queries )
        return self.es.search(index=self.RESUME_INDEX, doc_type=self.RESUME_TYPE, body=combined_query)['hits']

#######
#FIXME:find_by_* not needed if find_resumes() can handle everything
    def find_by_name(self, firstname, lastname):
        fn_query = ln_query = None
        if firstname is not None: fn_query = filtered_term_query( 'firstName', firstname.lower() )
        if lastname is not None: ln_query = filtered_term_query( 'lastName', lastname.lower() )
        name_query = bool_query( filter( lambda q: q is not None, [fn_query, ln_query] ) )
        return self.es.search(index=self.RESUME_INDEX, doc_type=self.RESUME_TYPE, body=name_query)['hits']

    def find_by_skill(self, skills):
        skill_query = bool_query( [nested_query(s) for s in skills ] )
        return self.es.search(index=self.RESUME_INDEX, doc_type=self.RESUME_TYPE, body=skill_query)['hits']
#######

    def get_resume(self, id):
        resume = self.es.get(index=self.RESUME_INDEX, doc_type=self.RESUME_TYPE, id=id)
        return resume

    def delete_resume(self, id):
        self.es.delete(index=self.RESUME_INDEX, doc_type=self.RESUME_TYPE, id=id)

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

