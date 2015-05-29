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
        url: configuration.api + '/api/project/0000000005'
      });
    };

    return service;
  });
