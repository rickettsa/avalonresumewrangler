import uuid

class UnimplementedError(BaseException):
    '''Exception raised when an interface method was not overridden.'''
    pass

class DataLayer:
    '''A data layer backend abstraction supporting the necessary methods to
    create, retrieve, update, delete, and search resume data. Supports specific
    data stores such as Elasticsearch, Couchbase, and MarkLogic.'''

    @staticmethod
    def factory(type):
        if type == 'Elasticsearch':
            from es import ESDataLayer
            return ESDataLayer()
        if type == 'MarkLogic':
            from ml import MLDataLayer
            return MLDataLayer()
        if type == 'Couchbase':
            from cb import CBDataLayer
            return CBDataLayer()
        assert 0, 'Invalid data layer: ' + type

    @staticmethod
    def uuid(): return uuid.uuid4()

    def create_resume(self, resume, id):
        raise UnimplementedError()
    def update_resume(self, resume, id):
        raise UnimplementedError()
    def list_resumes():
        raise UnimplementedError()
    def get_resume(self, id):
        raise UnimplementedError()
    def delete_resume(self, id):
        raise UnimplementedError()

