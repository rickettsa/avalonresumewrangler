"use strict";

/**
 * @ngdoc service
 * @name resumeWrangler.LoginService
 * @description Create,Read,Update,Delete service for skills JSON from backend.
 */
angular.module('resumeWrangler')
  .service('LoginService', function($rootScope, $http, Session) {
    var loginService = {};

    loginService.login = function (profile) {
        Session.create(profile);
    };

    loginService.logout = function () {
      Session.destroy();
    };

    loginService.isAuthenticated = function () {
      return !!Session.userId;
    };

    loginService.isAuthorized = function (authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      return (loginService.isAuthenticated() &&
        _.intersection(authorizedRoles, Session.userRole).length > 0);
    };

    return loginService;
  });