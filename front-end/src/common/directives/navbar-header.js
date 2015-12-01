"use strict";

/**
 * @ngdoc directive
 * @name resumeWrangler.directive:dsSearchForm
 * @description Search form directive.
 */
angular.module('resumeWrangler')
  .directive('rwNavbarHeader', function($rootScope) {
    return {
      templateUrl: 'templates/navbar-header.tpl.html',
      controller: function($scope, $state, $rootScope){
        $scope.runGlobalSearch = function(){
          $rootScope.global.search.cachedSearch.query = $scope.query;
          $state.go('searchResults', {"query": $scope.global.search.query});
        };

        //handle bootstrap nav expand
        $scope.global.navVisible = 0;
        $scope.global.toggleNavVis = function(){
          if ($scope.global.navVisible === 0){
            $scope.global.navVisible = 1;
          } else {
            $scope.global.navVisible = 0;
          }
        };
      }
    };
  });