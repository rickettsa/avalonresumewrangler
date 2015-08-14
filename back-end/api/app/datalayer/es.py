from datalayer import DataLayer

from elasticsearch import Elasticsearch

class ESDataLayer(DataLayer):
    '''A data layer for Elasticsearch.'''

    RESUME_INDEX = 'resumes'
    RESUME_TYPE = 'resume'

    def __init__(self):
        self.es = Elasticsearch()

    def create_resume(self, resume):
        self.es.index(index=self.RESUME_INDEX, doc_type=self.RESUME_TYPE,
                body=resume, id=DataLayer.uuid())

    def create_resume(self, resume, id):
        self.es.index(index=self.RESUME_INDEX, doc_type=self.RESUME_TYPE, body=resume, id=id)

    def update_resume(self, resume, id):
        return self.create_resume(resume, id)

    def list_resumes(self):
        resumes = self.es.search(index=self.RESUME_INDEX, doc_type=self.RESUME_TYPE)
        return resumes

    def get_resume(self, id):
        resume = self.es.get(index=self.RESUME_INDEX, doc_type=self.RESUME_TYPE, id=id)
        return resume

    def delete_resume(self, id):
        es.delete(index=self.RESUME_INDEX, doc_type=self.RESUME_TYPE, id=id)


if __name__ == '__main__':
    dl = DataLayer.factory( 'Elasticsearch' )
    print(dl)
    print(dl.es)
    print(dl.RESUME_INDEX)
    print(dl.RESUME_TYPE)
    print dl.get_resume('AU76Hwu_NXud7rAthNR8')
#    dl.create_resume('r')

