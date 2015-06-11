"use strict";

/**
 * @ngdoc service
 * @name resumeWrangler.LoginService
 * @description Create,Read,Update,Delete service for skills JSON from backend.
 */
angular.module('resumeWrangler')
  .service('LoginService', function($rootScope, $http, configuration) {
    var service = {};

    service.getBasicProfile = function(googleUser){
      var profile = googleUser.getBasicProfile();
      console.log('ID: ' + profile.getId());
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail());
    };

    return service;
  });