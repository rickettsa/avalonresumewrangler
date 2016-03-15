/**
 * @ngdoc service
 * @name resumeWrangler.LoginService
 * @description Create,Read,Update,Delete service for skills JSON from backend.
 */

(function(){
  "use strict";
  angular
    .module('resumeWrangler')
    .service('loginService', loginService);

    loginService.$inject = ['$rootScope', '$http,' 'sessionService'];

    function loginService($rootScope, $http, sessionService) {

      var loginService = {
        login           : login,
        logout          : logout,
        isAuthenticated : isAuthenticated,
        isAuthorized    : isAuthorized
      };

      return loginService;

      function login(profile) {
        sessionService.create(profile);
      };

      function logout() {
        sessionService.destroy();
      };

      function isAuthenticated() {
        return !!sessionService.userId;
      };

      function isAuthorized (authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
          authorizedRoles = [authorizedRoles];
        }
        return (loginService.isAuthenticated() &&
          _.intersection(authorizedRoles, sessionService.userRole).length > 0);
      };
    };

})();