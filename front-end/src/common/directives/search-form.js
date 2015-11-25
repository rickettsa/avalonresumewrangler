"use strict";

/**
* @ngdoc directive
* @name resumeWrangler.directive:dsSearchForm
* @description Search form directive.
*/
angular.module('resumeWrangler')
  .directive('dsSearchForm', function($rootScope) {
    return {
      templateUrl: 'templates/search-form.tpl.html',
      restrict: 'E',
      scope: {},
      controller: function($scope, resumeCRUDService, $state, $rootScope){
        $scope.runSearch = function(){
          $rootScope.global.search.cachedSearch.query = $scope.query;
          $state.go('searchResults', {"query": $scope.query});
        };

      }
    };
  });