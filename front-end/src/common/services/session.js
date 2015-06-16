"use strict";

/**
 * @ngdoc service
 * @name resumeWrangler.Session
 * @description Create user session.
 */
angular.module('resumeWrangler')
  .service('Session', function () {
  this.create = function (profile) {
    this.id = this.generateUUID();
    this.userId = profile.getId();
    this.userName = profile.getName();
    this.userImg = profile.getImageUrl();
    this.userEmail = profile.getEmail();
    this.userRole = this.roleLookup(this.userEmail);
  };

  this.destroy = function () {
    this.id = null;
    this.userId = null;
    this.userName = null;
    this.userImg = null;
    this.userEmail = null;
    this.userRole = null;
  };

  //http://jsfiddle.net/briguy37/2MVFd/
  this.generateUUID = function(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
  };

  var lookup = {
    "beckera@avalonconsult.com": ["editor","admin"],
    "abembecker@gmail.com": ["guest"]
  };

  this.roleLookup = function(userEmail){
    if (userEmail && lookup.hasOwnProperty(userEmail)){
      return lookup[userEmail];
    }
  };


})