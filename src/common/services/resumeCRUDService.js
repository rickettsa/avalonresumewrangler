"use strict";

/**
 * @ngdoc service
 * @name resumeWrangler.resumeCRUDService
 * @description Create,Read,Update,Delete service for resume JSON from backend.
 */
angular.module('resumeWrangler')
  .service('resumeCRUDService', function($rootScope, $http, configuration) {
    var service = {};

    /**
     * Get summary list of all resumes
     * @returns {promise}
     */
    service.fetchResume = function() {
      //http://private-b7b35-avalonresumesearch.apiary-mock.com/api/resume/0000000124
      //return $http.get('http://private-b7b35-avalonresumesearch.apiary-mock.com/api/resume/' + id);
      return $http({
        method: "GET",
        cache: true,
        url: configuration.api + '/api/resume/0000000124'
      });
    };

    service.runQuery = function(currentSearch){
      return $http({
        method: "GET",
        cache: true,
        url: configuration.api + '/api/resumes/search'
      });
    };

    return service;
  });
