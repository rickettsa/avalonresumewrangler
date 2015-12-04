"use strict";

/**
 * @ngdoc service
 * @name resumeWrangler.LoginService
 * @description Create,Read,Update,Delete service for skills JSON from backend.
 */
angular.module('resumeWrangler')
  .service('loginService', function($rootScope, $http, sessionService) {
    var loginService = {};

    loginService.login = function (profile) {
        sessionService.create(profile);
    };

    loginService.logout = function () {
      sessionService.destroy();
    };

    loginService.isAuthenticated = function () {
      return !!sessionService.userId;
    };

    loginService.isAuthorized = function (authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      return (loginService.isAuthenticated() &&
        _.intersection(authorizedRoles, sessionService.userRole).length > 0);
    };

    return loginService;
  });