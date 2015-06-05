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
          console.log("broadcast sent");
          $rootScope.cachedSearch = {};
          $rootScope.cachedSearch.query = $scope.query;
          $state.go('searchResults', {}, { reload: false });
          $rootScope.$broadcast('run-global-search', {"query": $scope.query });
        };

      }
    };
  });