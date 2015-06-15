"use strict";

/**
 * @ngdoc directive
 * @name resumeWrangler.directive:dsUserLogin
 * @description Search form directive.
 */
angular.module('resumeWrangler')
  .directive('dsUserLogin', function($rootScope) {
    return {
      templateUrl: 'templates/user-login.tpl.html',
      restrict: 'E',
      scope: true,
      controller: function($scope, $state, $rootScope) {
        $scope.loggedIn = 0;

        //not scoped on purpose so it works with Google login button
        function onSignIn(googleUser) {
          var profile = googleUser.getBasicProfile();
          $rootScope.userProfile = {};
          $rootScope.userProfile.id = profile.getId();
          $rootScope.userProfile.name = profile.getName();
          $rootScope.userProfile.biopic = profile.getImageUrl();
          $rootScope.userProfile.email = profile.getEmail();
          $scope.loggedIn = 1;
          console.log('ID: ' + profile.getId());
          console.log('Name: ' + profile.getName());
          console.log('Image URL: ' + profile.getImageUrl());
          console.log('Email: ' + profile.getEmail());
          $rootScope.$broadcast('userLogin', {"userProfile": $rootScope.userProfile });
          $scope.$apply();
        };
        window.onSignIn = onSignIn;


        $scope.signOut = function() {
          var auth2 = gapi.auth2.getAuthInstance();
          auth2.signOut().then(function() {
            $scope.loggedIn = 0;
            $scope.$apply();
          });
        };

      }
    };
  });
