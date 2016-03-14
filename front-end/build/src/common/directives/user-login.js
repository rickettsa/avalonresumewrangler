"use strict";

/**
 * @ngdoc directive
 * @name resumeWrangler.directive:dsUserLogin
 * @description Search form directive.
 */
angular.module('resumeWrangler')
  .directive('dsUserLogin', function($rootScope, $state) {
    return {
      templateUrl: 'templates/user-login.tpl.html',
      restrict: 'E',
      scope: true,
      controller: function($scope, $state, $rootScope, sessionService, loginService) {

        $scope.userRole = "";
        $scope.$watch(
          function(){
            return sessionService.userRole;
          },
          function(newValue, oldValue){
            //console.log("userRole Watch: " + newValue);
            if (newValue){
              $scope.userRole = newValue.toString();
            } else {
              $scope.userRole = null;
            }
          }
        );


        $scope.session = sessionService;

        $scope.isAuthenticated = false;
        $scope.$watch(
          function(){
            return loginService.isAuthenticated();
          },
          function(newValue, oldValue){
            $scope.isAuthenticated = newValue;
          }
        );


        //not scoped on purpose so it works with Google login button
        function onSignIn(googleUser) {
          var profile = googleUser.getBasicProfile();

          //Create application session to match Google session if auth succeeds
          loginService.login(profile);
          if (loginService.isAuthenticated()){
              $scope.$apply();
          }
        };
        window.onSignIn = onSignIn;


        $scope.signOut = function() {
          var auth2 = gapi.auth2.getAuthInstance();
          auth2.signOut().then(function() {
            loginService.logout();
            $scope.$apply();
          });
          $state.go('home');
        };

      }
    };
  });
