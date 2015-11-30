"use strict";

/**
 * @ngdoc service
 * @name resumeWrangler.contactsService
 * @description Create,Read,Update,Delete service for contact JSON from backend.
 */
angular.module('resumeWrangler')
  .service('contactsService', function($rootScope, $http, configuration) {
    var service = {};

    /**
     * Get summary list of all resumes
     * @returns {promise}
     */
    service.fetchContactByName = function(firstName,lastName) {
      //http://private-b7b35-avalonresumesearch.apiary-mock.com/api/resume/0000000124
      //return $http.get('http://private-b7b35-avalonresumesearch.apiary-mock.com/api/resume/' + id);
      return $http({
        method: "GET",
        cache: true,
        url: configuration.api + '/api/users/search?firstname=' + firstName + '&lastname=' + lastName
      });
    };

//    service.runQuery = function(currentSearch){
//      return $http({
//        method: "GET",
//        url: configuration.api + '/api/resumes/search?expand_user_info=true&skill=' + currentSearch
//      });
//    };
//
//    service.createResume = function(payload) {
//      return $http({
//        method: "POST",
//        cache: true,
//        url: configuration.api + '/api/resumes/',
//        data: payload
//      });
//    };
//
//    service.updateResume = function(id, payload) {
//      return $http({
//        method: "PUT",
//        cache: true,
//        headers: {
//          'Content-Type': 'application/json'
//        },
//        url: configuration.api + '/api/resumes/' + id,
//        data: { "Resume": { "StructuredXMLResume": payload }}
//      });
//    };

    return service;
  });
