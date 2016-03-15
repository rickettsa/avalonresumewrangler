/**
 * @ngdoc service
 * @name resumeWrangler.contactsService
 * @description Create,Read,Update,Delete service for contact JSON from backend.
 */

(function(){
  "use strict";

  angular
    .module('resumeWrangler')
    .service('contactsService', contactsService);

    contactsService.$inject = ['$rootScope', '$http', 'configuration'];

    function contactsService($rootScope, $http, configuration) {
      var service = {
        fetchContactByName : fetchContactByName,
        createUser         : createUser
      };

      return service;

    /**
     * Get summary list of all resumes
     * @returns {promise}
     */
    function fetchContactByName(firstName,lastName) {
      //http://private-b7b35-avalonresumesearch.apiary-mock.com/api/resume/0000000124
      //return $http.get('http://private-b7b35-avalonresumesearch.apiary-mock.com/api/resume/' + id);
      return $http({
        method : "GET",
        url    : configuration.api + '/api/users/search?firstname=' + firstName + '&lastname=' + lastName
      });
    };

    function createUser(payload) {
      return $http({
        method : "POST",
        url    : configuration.api + '/api/users',
        data   : payload
      });
    };

  };
})();


//
//    service.createResume = function(payload) {
//      return $http({
//        method: "POST",
//        url: configuration.api + '/api/resumes/',
//        data: payload
//      });
//    };
//
//    service.updateResume = function(id, payload) {
//      return $http({
//        method: "PUT",
//        headers: {
//          'Content-Type': 'application/json'
//        },
//        url: configuration.api + '/api/resumes/' + id,
//        data: { "Resume": { "StructuredXMLResume": payload }}
//      });
//    };





