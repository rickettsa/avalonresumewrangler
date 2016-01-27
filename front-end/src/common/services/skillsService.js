"use strict";

/**
 * @ngdoc service
 * @name resumeWrangler.SkillsService
 * @description Create,Read,Update,Delete service for skills JSON from backend.
 */
angular.module('resumeWrangler')
  .service('skillsService', function($rootScope, $http, configuration) {
    var service = {};

    /**
     * Get summary list of all resumes
     * @returns {promise}
     */
    service.fetchSkills = function() {
      //http://private-b7b35-avalonresumesearch.apiary-mock.com/api/skills
      return $http({
        method: "GET",
        cache: true,
        url: configuration.apiary + '/api/skills'
      });
    };

    service.updateSkills = function(payload) {
      return $http({
        method: "PUT",
        url: configuration.api + '/api/skills',
        data: payload
      });
    };

    service.fetchStacks = function() {
      return $http({
        method: "GET",
        cache: true,
        url: configuration.apiary + '/api/stacks'
      });
    };

    service.updateStacks = function(payload) {
      return $http({
        method: "PUT",
        url: configuration.api + '/api/stacks',
        data: payload
      });
    };

    service.fetchStackPositions = function() {
      return $http({
        method: "GET",
        cache: true,
        url: configuration.apiary + '/api/stack-positions'
      });
    };

    service.updateStackPositions = function(payload) {
      return $http({
        method: "PUT",
        url: configuration.api + '/api/stack-positions',
        data: payload
      });
    };

    service.getTypeaheadSource = function() {
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

    return service;
  });
