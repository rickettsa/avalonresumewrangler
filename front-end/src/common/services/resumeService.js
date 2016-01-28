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
      var nameStr;

      if (!_.isEmpty(firstName)){
        nameStr = "firstname=" + firstName;
      }

      if(!_.isEmpty(lastName)){
        nameStr += "&lastname=" + lastName;
      }

      return $http({
        method: "GET",
        url: configuration.api + '/api/resumes/search?' + nameStr
      });
    };

    service.skillSearch = function(skillName){
      return $http({
        method: "GET",
        url: configuration.api + '/api/resumes/search?expand_contact_info=true&skill=' + skillName
      });
    };

    service.createResume = function(payload) {
      return $http({
        method: "POST",
        url: configuration.api + '/api/resumes/',
        data: payload
      });
    };

    service.updateResume = function(id, payload) {
      return $http({
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        url: configuration.api + '/api/resumes/' + id,
        data: payload
      });
    };

    return service;
  });
