"use strict";

angular.module('resumeWrangler')
  .service('appConfig', function($rootScope, $http, configuration, Restangular) {
    var service = {};

    service.stackPositions = ["front-end", "back-end", "middleware", "search-engine", "bug-reporting", "IDE"];

    service.stackNames = ["ELK", "Java", "MEAN", "LAMP", "NodeJs"];

    return service;
  });
