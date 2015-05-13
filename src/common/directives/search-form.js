"use strict";

/**
* @ngdoc directive
* @name resumeWrangler.directive:dsSearchForm
* @description Search form directive.
*/
angular.module('resumeWrangler')
  .directive('dsSearchForm', function() {
    return {
      templateUrl: 'templates/search-form.tpl.html',
      restrict: 'E',
      scope: {},
      controller: function($scope, resumeCRUDService, $state, $rootScope){

        $scope.searchResponse = {};
        $scope.currentSearch = {};

        $scope.runSearch = function(){
          $rootScope.cachedSearch = {};
          $rootScope.cachedSearch.query = $scope.currentSearch.query;
          $state.go('searchResults', {}, { reload: false });
        };

      }
    };
  });