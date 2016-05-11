/**
 * @ngdoc service
 * @name resumeWrangler.SkillsService
 * @description Create,Read,Update,Delete service for skills JSON from backend.
 */


  "use strict";

  angular
    .module('resumeWrangler')
    .service('skillsService', skillsService);


    function skillsService($rootScope, $http, configuration) {

      var service = {
        fetchSkills         : fetchSkills,
        updateSkills        : updateSkills,
        updateSkill         : updateSkill,
        fetchStacks         : fetchStacks,
        updateStacks        : updateStacks,
        createStack         : createStack,
        createStackPosition : createStackPosition
      };

      return service;


      /**
       * Get summary list of all resumes
       * @returns {promise}
       */
      function fetchSkills() {
        //http://private-b7b35-avalonresumesearch.apiary-mock.com/api/skills
        return $http({
          method : "GET",
          url    : configuration.api + '/api/skills'
        });
      };

      function updateSkills(payload) {
        return $http({
          method : "PUT",
          url    : configuration.api + '/api/skills',
          data   : payload
        });
      };

      function updateSkill(id, payload) {
        return $http({
          method : "PUT",
          url    : configuration.api + '/api/skills/' + id,
          data   : payload
        });
      };

      function fetchStacks() {
        return $http({
          method : "GET",
          url    : configuration.api + '/api/stacks'
        });
      };

      function updateStacks(payload) {
        return $http({
          method : "PUT",
          url    : configuration.api + '/api/stacks',
          data   : payload
        });
      };

      function createStack(payload, id) {
        return $http({
          method : "PUT",
          url    : configuration.api + '/api/stacks/' + id,
          data   : payload
        });
      };

      function fetchStackPositions() {
        return $http({
          method : "GET",
          url    : configuration.api + '/api/stack-positions'
        });
      };

      function updateStackPositions(payload) {
        return $http({
          method : "PUT",
          url    : configuration.api + '/api/stack-positions',
          data   : payload
        });
      };

      function createStackPosition(payload, id) {
        return $http({
          method : "PUT",
          url    : configuration.api + '/api/stack-positions/' + id,
          data   : payload
        });
      };
    };


