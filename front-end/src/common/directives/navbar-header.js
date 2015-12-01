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

      }
    };
  });