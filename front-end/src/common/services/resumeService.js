"use strict";

/**
 * @ngdoc service
 * @name resumeWrangler.resumeCRUDService
 * @description Create,Read,Update,Delete service for resume JSON from backend.
 */
angular.module('resumeWrangler')
  .service('resumeService', function($rootScope, $http, configuration) {
    var service = {};

    /**
     * Get summary list of all resumes
     * @returns {promise}
     */
    service.fetchResume = function(firstName,lastName) {
      //http://private-b7b35-avalonresumesearch.apiary-mock.com/api/resume/0000000124
      //return $http.get('http://private-b7b35-avalonresumesearch.apiary-mock.com/api/resume/' + id);
      return $http({
        method: "GET",
        cache: true,
        url: configuration.api + '/api/resumes/search?firstname=' + firstName + '&lastname=' + lastName
      });
    };

    service.runQuery = function(currentSearch){
      return $http({
        method: "GET",
        url: configuration.api + '/api/resumes/search?expand_user_info=true&skill=' + currentSearch
      });
    };

    service.createResume = function(payload) {
      return $http({
        method: "POST",
        cache: true,
        url: configuration.api + '/api/resumes/',
        data: payload
      });
    };

    service.updateResume = function(id, payload) {
      return $http({
        method: "PUT",
        cache: true,
        headers: {
          'Content-Type': 'application/json'
        },
        url: configuration.api + '/api/resumes/' + id + '/',
        data: payload
      });
    };

    return service;
  });
