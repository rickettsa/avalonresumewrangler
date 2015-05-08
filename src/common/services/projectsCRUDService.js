"use strict";

/**
 * @ngdoc service
 * @name resumeWrangler.resumeCRUDService
 * @description Create,Read,Update,Delete service for resume JSON from backend.
 */
angular.module('resumeWrangler')
  .service('projectsCRUDService', function($rootScope, $http) {
    var service = {};

    /**
     * Get summary list of all resumes
     * @returns {promise}
     */
    service.fetchProject = function() {
      return $http({
        method: "GET",
        cache: true,
        url: 'http://private-b7b35-avalonresumesearch.apiary-mock.com/api/project/0000000005'
      });
    };

    return service;
  });
