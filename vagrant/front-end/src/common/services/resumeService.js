/**
 * @ngdoc service
 * @name resumeWrangler.resumeCRUDService
 * @description Create,Read,Update,Delete service for resume JSON from backend.
 */



"use strict";

  angular
    .module('resumeWrangler')
    .service('resumeService', resumeService);



  function resumeService($rootScope, $http, configuration) {

    var service = {
      fetchResume  : fetchResume,
      skillSearch  : skillSearch,
      createResume : createResume,
      updateResume : updateResume
    };

    return service;

    /**
     * Get summary list of all resumes
     * @returns {promise}
     */
    function fetchResume (firstName,lastName) {
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
        method : "GET",
        url    : configuration.api + '/api/resumes/search?' + nameStr,
        data   : {}
      });
    };

     function skillSearch(skillName){
      return $http({
        method : "GET",
        url    : configuration.api + '/api/resumes/search?expand_user_info=true&skill=' + skillName
      });
    };

     function createResume(userid) {
      return $http({
        method  : "POST",
        headers : {'Content-Type': 'application/json'},
        url     : configuration.api + '/api/resumes',
        data    : {"userId": userid}
      });
    };

    function updateResume(id, payload) {
      return $http({
        method  : "PUT",
        headers : {'Content-Type': 'application/json'},
        url     : configuration.api + '/api/resumes/' + id,
        data    : payload
      });
    };
  };




