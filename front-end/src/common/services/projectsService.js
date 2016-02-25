"use strict";

/**
 * @ngdoc service
 * @name resumeWrangler.resumeCRUDService
 * @description Create,Read,Update,Delete service for resume JSON from backend.
 */
angular.module('resumeWrangler')
  .service('projectsService', function($rootScope, $http, configuration) {
    var service = {};

    /**
     * Get summary list of a specific projects
     * @returns {promise}
     */
    service.fetchProject = function(projectId) {
      return $http({
        method: "GET",
        url: configuration.api + '/api/projects/' + projectId + '?expand_user_info=true'
      });
    };

    /**
     * Get summary list of all projects
     * @returns {promise}
     */
    service.fetchProjects = function(skill) {
      var url = configuration.api + '/api/projects/search?expand_user_info=true';

      if (!_.isEmpty(skill)){
          url += '?project_skills=' + skill;
      }

      return $http({
        method: "GET",
        url: url
      });
    };

    service.updateProject = function(id, payload) {
      return $http({
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        url: configuration.api + '/api/projects/' + id,
        data: payload
      });
    };

    return service;
  });
