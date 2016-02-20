"use strict";

/**
 * @ngdoc service
 * @name resumeWrangler.Session
 * @description Create user session.
 */
angular.module('resumeWrangler')
  .service('sessionService', function () {

      function _splitFullName(fullNm, output){
        if (!_.isEmpty(fullNm)){
          var nameSplitRegex = /^([^\s]+)\s+.*?([^\s]+)$/;
          var match = nameSplitRegex.exec(fullNm);
          if (output === 'first'){
            return match[1];
          } else {
            return match[2];
          }
        } else {
          return '';
        }
      }

      this.create = function (profile) {
        this.id = this.generateUUID();
        this.userId = profile.getId();
        this.userName = profile.getName();
        this.firstName = _splitFullName(this.userName, 'first');
        this.lastName = _splitFullName(this.userName, 'last');
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
      "beckera@avalonconsult.com": ["editor", "admin"],
      "kehoem@avalonconsult.com": ["editor", "admin"],
      "holsheyj@avalonconsult.com": ["editor", "admin"],
       "uvenkatadasari@avalonconsult.com": ["editor", "admin"],
      "abembecker@gmail.com": ["guest", "all"]
    };

    this.roleLookup = function(userEmail){
      if (userEmail && lookup.hasOwnProperty(userEmail)){
        return lookup[userEmail];
      }
    };


})