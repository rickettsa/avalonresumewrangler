"use strict";

/**
 * @ngdoc service
 * @name resumeWrangler.resumeCRUDService
 * @description Create,Read,Update,Delete service for resume JSON from backend.
 */
angular.module('resumeWrangler')
  .service('projectsCRUDService', function($rootScope, $http, configuration) {
    var service = {};

    /**
     * Get summary list of all resumes
     * @returns {promise}
     */
    service.fetchProject = function() {
      return $http({
        method: "GET",
        cache: true,
        url: configuration.api + '/api/projects/0000000005'
      });
    };

    service.updateProject = function(id, payload) {
      return $http({
        method: "PUT",
        cache: true,
        headers: {
          'Content-Type': 'application/json'
        },
        url: configuration.api + '/api/projects/' + id,
        data: { "Project": [ payload ]}
      });
    };

    return service;
  });
