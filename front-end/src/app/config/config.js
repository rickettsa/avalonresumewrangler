"use strict";

angular.module('AppConfig', [])
  .provider('AppConfig', function() {
    var config = {};

    config.search = {};
    config.search.skillsDispLimit = 4;

    config.stackPositions = ["front-end", "back-end", "middleware", "search-engine", "bug-reporting", "IDE"];

    config.stackNames = ["ELK", "Java", "MEAN", "LAMP", "NodeJs"];

    /**** START CONSTANTS ****/
    config.AUTH_EVENTS = {
      loginSuccess: 'auth-login-success',
      loginFailed: 'auth-login-failed',
      logoutSuccess: 'auth-logout-success',
      sessionTimeout: 'auth-session-timeout',
      notAuthenticated: 'auth-not-authenticated',
      notAuthorized: 'auth-not-authorized'
    };

    config.USER_ROLES = {
      all: '*',
      admin: 'admin',
      editor: 'editor',
      guest: 'guest'
    };
    /**** END CONSTANTS ****/

    return {
      $get: function () {
        return config;
      }
    };
  });
