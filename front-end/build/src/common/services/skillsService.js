/**
 * @ngdoc service
 * @name resumeWrangler.SkillsService
 * @description Create,Read,Update,Delete service for skills JSON from backend.
 */

(function(){
  "use strict";

  angular
    .module('resumeWrangler')
    .service('skillsService', skillsService);

    skillsService.$inject = ['$rootScope', '$http', 'configuration']

    function skillsService($rootScope, $http, configuration) {

      var service = {
        fetchSkills         : fetchSkills,
        updateSkills        : updateSkills,
        updateSkill         : updateSkill,
        fetchStacks         : fetchStacks,
        updateStacks        : updateStacks,
        createStack         : createStack,
        createStackPosition : createStackPosition,
        getTypeaheadSource  : getTypeaheadSource
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

      function getTypeaheadSource() {
        return new Bloodhound({
          datumTokenizer: Bloodhound.tokenizers.obj.whitespace('hint'),
          queryTokenizer: Bloodhound.tokenizers.whitespace,
          limit: 10,
          remote: {
            //url: Authentication.getApiUrl() + '/instances/search/suggestions?q=%QUERY', // The API endpoint for search suggestions
            url: configuration.apiary + '/api/skills',
            /**
             * Reduce the response down to an array of objects since the API doesn't return that outright.
             * @param {Object} parsedResponse
             * @returns {*}
             */
            filter: function(parsedResponse) {
              var ret = [];

              if (parsedResponse.skills) {
                var skills = parsedResponse.skills;
                var keys = _.keys(skills);

                _.forEach(keys, function(skill) {
                  var retObj = {};
                  retObj.abbrev = skill;
                  retObj.displayName = skills[skill]["dispName"];
                  retObj.image = skills[skill]["image"];
                  ret.push(retObj);
                });
              }
              return ret;
            }
          }
        });
      };

    };
})();

