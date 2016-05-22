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
      this.id        = this.generateUUID();
      this.userId    = profile.getId();
      this.userName  = profile.getName();
      this.firstName = _splitFullName(this.userName, 'first');
      this.lastName  = _splitFullName(this.userName, 'last');
      this.userImg   = profile.getImageUrl();
      this.userEmail = profile.getEmail();
      this.userRole  = this.roleLookup(this.userEmail);
    };

    this.destroy = function () {
      this.id        = null;
      this.userId    = null;
      this.userName  = null;
      this.userImg   = null;
      this.userEmail = null;
      this.userRole  = null;
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
          "beckera@avalonconsult.com"           : ["editor", "admin"],
          "kehoem@avalonconsult.com"            : ["editor", "admin"],
          "holsheyj@avalonconsult.com"          : ["editor", "admin"],
          "uvenkatadasari@avalonconsult.com"    : ["editor", "admin"],
          "abembecker@gmail.com"                : ["guest", "all"],
          "rickettsa@avalonconsult.com"         : ["editor", "admin"],
          "erismank@avalonconsult.com"          : ["editor", "admin"],
          "macedoa@avalonconsult.com"           : ["editor", "admin"],
          "alexanderb@avalonconsult.com"        : ["editor", "admin"],
          "applebaumw@avalonconsult.com"        : ["editor", "admin"],
          "atkinsc@avalonconsult.com"           : ["editor", "admin"],
          "bakkenh@avalonconsult.com"           : ["editor", "admin"],
          "balexander@avalonconsult.com"        : ["editor", "admin"],
          "bonapartem@avalonconsult.com"        : ["editor", "admin"],
          "botk@avalonconsult.com"              : ["editor", "admin"],
          "bowere@avalonconsult.com"            : ["editor", "admin"],
          "cahillt@avalonconsult.com"           : ["editor", "admin"],
          "greenc@avalonconsult.com"            : ["editor", "admin"],
          "cavnara@avalonconsult.com"           : ["editor", "admin"],
          "chatfieldc@avalonconsult.com"        : ["editor", "admin"],
          "cherianm@avalonconsult.com"          : ["editor", "admin"],
          "grimesc@avalonconsult.com"           : ["editor", "admin"],
          "cohana@avalonconsult.com"            : ["editor", "admin"],
          "confluence@avalonconsult.com"        : ["editor", "admin"],
          "coudrond@avalonconsult.com"          : ["editor", "admin"],
          "coxd@avalonconsult.com"              : ["editor", "admin"],
          "curtisk@avalonconsult.com"           : ["editor", "admin"],
          "lawlerd@avalonconsult.com"           : ["editor", "admin"],
          "devadossr@avalonconsult.com"         : ["editor", "admin"],
          "donnoet@avalonconsult.com"           : ["editor", "admin"],
          "dowds@avalonconsult.com"             : ["editor", "admin"],
          "faviap@avalonconsult.com"            : ["editor", "admin"],
          "filhob@avalonconsult.com"            : ["editor", "admin"],
          "flatscherm@avalonconsult.com"        : ["editor", "admin"],
          "gardnerb@avalonconsult.com"          : ["editor", "admin"],
          "gastonb@avalonconsult.com"           : ["editor", "admin"],
          "gattusod@avalonconsult.com"          : ["editor", "admin"],
          "gloriosoj@avalonconsult.com"         : ["editor", "admin"],
          "greenb@avalonconsult.com"            : ["editor", "admin"],
          "greenm@avalonconsult.com"            : ["editor", "admin"],
          "guilarane@avalonconsult.com"         : ["editor", "admin"],
          "halls@avalonconsult.com"             : ["editor", "admin"],
          "harriss@avalonconsult.com"           : ["editor", "admin"],
          "hendricksj@avalonconsult.com"        : ["editor", "admin"],
          "hessd@avalonconsult.com"             : ["editor", "admin"],
          "jewittt@avalonconsult.com"           : ["editor", "admin"],
          "kamannavars@avalonconsult.com"       : ["editor", "admin"],
          "keshkm@avalonconsult.com"            : ["editor", "admin"],
          "kimk@avalonconsult.com"              : ["editor", "admin"],
          "loyerr@avalonconsult.com"            : ["editor", "admin"],
          "malikr@avalonconsult.com"            : ["editor", "admin"],
          "mannd@avalonconsult.com"             : ["editor", "admin"],
          "marinoc@avalonconsult.com"           : ["editor", "admin"],
          "marshallb@avalonconsult.com"         : ["editor", "admin"],
          "mefforda@avalonconsult.com"          : ["editor", "admin"],
          "meffordsp@avalonconsult.com"         : ["editor", "admin"],
          "mohans@avalonconsult.com"            : ["editor", "admin"],
          "moorej@avalonconsult.com"            : ["editor", "admin"],
          "nelsons@avalonconsult.com"           : ["editor", "admin"],
          "nembhanis@avalonconsult.com"         : ["editor", "admin"],
          "neumanb@avalonconsult.com"           : ["editor", "admin"],
          "nielsenn@avalonconsult.com"          : ["editor", "admin"],
          "PeterssonS@avalonconsult.com"        : ["editor", "admin"],
          "platzj@avalonconsult.com"            : ["editor", "admin"],
          "Prabhug@avalonconsult.com"           : ["editor", "admin"],
          "pto@avalonconsult.com"               : ["editor", "admin"],
          "diprimar@avalonconsult.com"          : ["editor", "admin"],
          "reddym@avalonconsult.com"            : ["editor", "admin"],
          "reddys@avalonconsult.com"            : ["editor", "admin"],
          "reidyc@avalonconsult.com"            : ["editor", "admin"],
          "reidyt@avalonconsult.com"            : ["editor", "admin"],
          "risdenk@avalonconsult.com"           : ["editor", "admin"],
          "rodriguezm@avalonconsult.com"        : ["editor", "admin"],
          "rosenzweigm@avalonconsult.com"       : ["editor", "admin"],
          "rossm@avalonconsult.com"             : ["editor", "admin"],
          "ruisij@avalonconsult.com"            : ["editor", "admin"],
          "atkinsr@avalonconsult.com"           : ["editor", "admin"],
          "simonf@avalonconsult.com"            : ["editor", "admin"],
          "smithk@avalonconsult.com"            : ["editor", "admin"],
          "suganthis@avalonconsult.com"         : ["editor", "admin"],
          "terryi@avalonconsult.com"            : ["editor", "admin"],
          "thayerw@avalonconsult.com"           : ["editor", "admin"],
          "torreyd@avalonconsult.com"           : ["editor", "admin"],
          "vemulam@avalonconsult.com"           : ["editor", "admin"],
          "venkatap@avalonconsult.com"          : ["editor", "admin"],
          "wahidm@avalonconsult.com"            : ["editor", "admin"],
          "westermana@avalonconsult.com"        : ["editor", "admin"],
          "wetzelt@avalonconsult.com"           : ["editor", "admin"],
          "zapatad@avalonconsult.com"           : ["editor", "admin"]
      };

    this.roleLookup = function(userEmail){
      if (userEmail && lookup.hasOwnProperty(userEmail)){
        return lookup[userEmail];
      }
    };

});