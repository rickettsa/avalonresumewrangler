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
      controller: function($scope, $state, $rootScope, Session, LoginService) {

        $scope.userRole = "";
        $scope.$watch(
          function(){
            return Session.userRole;
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


        $scope.session = Session;

        $scope.isAuthenticated = false;
        $scope.$watch(
          function(){
            return LoginService.isAuthenticated();
          },
          function(newValue, oldValue){
            $scope.isAuthenticated = newValue;
          }
        );


        //not scoped on purpose so it works with Google login button
        function onSignIn(googleUser) {
          var profile = googleUser.getBasicProfile();

          //Create application session to match Google session if auth succeeds
          LoginService.login(profile);
          if (LoginService.isAuthenticated()){
              $scope.$apply();
          }
        };
        window.onSignIn = onSignIn;


        $scope.signOut = function() {
          var auth2 = gapi.auth2.getAuthInstance();
          auth2.signOut().then(function() {
            LoginService.logout();
            $scope.$apply();
          });
          $state.go('home');
        };

      }
    };
  });
