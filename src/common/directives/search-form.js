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
      scope: {}
    };
  });