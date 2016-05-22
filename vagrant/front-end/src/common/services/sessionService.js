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
            "abembecker@gmail.com"                : ["guest", "all"],
            "uvenkatadasari@avalonconsult.com"    : ["editor", "admin"],
            "uday.venkat@gmail.com"               : ["guest", "all"],
            "rickettsa@avalonconsult.com"         : ["editor", "admin"],
            "erismank@avalonconsult.com"          : ["editor", "admin"],
            "macedoa@avalonconsult.com"           : ["editor", "admin"],

            "alexanderb@avalonconsult.com"        : ["editor", "admin"],
            "nielsenn@avalonconsult.com"          : ["editor", "admin"],
            "kehoem@avalonconsult.com"            : ["editor", "admin"],
            "holsheyj@avalonconsult.com"          : ["editor", "admin"],
            "applebaumw@avalonconsult.com"        : ["editor", "admin"],
            "balexander@avalonconsult.com"        : ["editor", "admin"],
            "greenc@avalonconsult.com"            : ["editor", "admin"],
            "chatfieldc@avalonconsult.com"        : ["editor", "admin"],
            "jewittt@avalonconsult.com"           : ["editor", "admin"],
            "cahillt@avalonconsult.com"           : ["editor", "admin"],
            "gattusod@avalonconsult.com"          : ["editor", "admin"],
            "gloriosoj@avalonconsult.com"         : ["editor", "admin"],
            "halls@avalonconsult.com"             : ["editor", "admin"],
            "nelsons@avalonconsult.com"           : ["editor", "admin"],
            "reidyt@avalonconsult.com"            : ["editor", "admin"],
            "greenm@avalonconsult.com"            : ["editor", "admin"],


            "atkinsc@avalonconsult.com"           : ["guest", "all"],
            "bakkenh@avalonconsult.com"           : ["guest", "all"],
            "bonapartem@avalonconsult.com"        : ["guest", "all"],
            "botk@avalonconsult.com"              : ["guest", "all"],
            "bowere@avalonconsult.com"            : ["guest", "all"],
            "cavnara@avalonconsult.com"           : ["guest", "all"],
            "cherianm@avalonconsult.com"          : ["guest", "all"],
            "grimesc@avalonconsult.com"           : ["guest", "all"],
            "cohana@avalonconsult.com"            : ["guest", "all"],
            "coudrond@avalonconsult.com"          : ["guest", "all"],
            "coxd@avalonconsult.com"              : ["guest", "all"],
            "curtisk@avalonconsult.com"           : ["guest", "all"],
            "lawlerd@avalonconsult.com"           : ["guest", "all"],
            "devadossr@avalonconsult.com"         : ["guest", "all"],
            "donnoet@avalonconsult.com"           : ["guest", "all"],
            "dowds@avalonconsult.com"             : ["guest", "all"],
            "faviap@avalonconsult.com"            : ["guest", "all"],
            "filhob@avalonconsult.com"            : ["guest", "all"],
            "flatscherm@avalonconsult.com"        : ["guest", "all"],
            "gardnerb@avalonconsult.com"          : ["guest", "all"],
            "gastonb@avalonconsult.com"           : ["guest", "all"],
            "greenb@avalonconsult.com"            : ["guest", "all"],
            "guilarane@avalonconsult.com"         : ["guest", "all"],
            "harriss@avalonconsult.com"           : ["guest", "all"],
            "hendricksj@avalonconsult.com"        : ["guest", "all"],
            "hessd@avalonconsult.com"             : ["guest", "all"],
            "kamannavars@avalonconsult.com"       : ["guest", "all"],
            "keshkm@avalonconsult.com"            : ["guest", "all"],
            "kimk@avalonconsult.com"              : ["guest", "all"],
            "loyerr@avalonconsult.com"            : ["guest", "all"],
            "malikr@avalonconsult.com"            : ["guest", "all"],
            "mannd@avalonconsult.com"             : ["guest", "all"],
            "marinoc@avalonconsult.com"           : ["guest", "all"],
            "marshallb@avalonconsult.com"         : ["guest", "all"],
            "mefforda@avalonconsult.com"          : ["guest", "all"],
            "meffordsp@avalonconsult.com"         : ["guest", "all"],
            "mohans@avalonconsult.com"            : ["guest", "all"],
            "moorej@avalonconsult.com"            : ["guest", "all"],
            "nembhanis@avalonconsult.com"         : ["guest", "all"],
            "neumanb@avalonconsult.com"           : ["guest", "all"],
            "platzj@avalonconsult.com"            : ["guest", "all"],
            "Prabhug@avalonconsult.com"           : ["guest", "all"],
            "diprimar@avalonconsult.com"          : ["guest", "all"],
            "reddym@avalonconsult.com"            : ["guest", "all"],
            "reddys@avalonconsult.com"            : ["guest", "all"],
            "reidyc@avalonconsult.com"            : ["guest", "all"],
            "risdenk@avalonconsult.com"           : ["guest", "all"],
            "rodriguezm@avalonconsult.com"        : ["guest", "all"],
            "rosenzweigm@avalonconsult.com"       : ["guest", "all"],
            "rossm@avalonconsult.com"             : ["guest", "all"],
            "ruisij@avalonconsult.com"            : ["guest", "all"],
            "atkinsr@avalonconsult.com"           : ["guest", "all"],
            "simonf@avalonconsult.com"            : ["guest", "all"],
            "smithk@avalonconsult.com"            : ["guest", "all"],
            "suganthis@avalonconsult.com"         : ["guest", "all"],
            "terryi@avalonconsult.com"            : ["guest", "all"],
            "thayerw@avalonconsult.com"           : ["guest", "all"],
            "torreyd@avalonconsult.com"           : ["guest", "all"],
            "vemulam@avalonconsult.com"           : ["guest", "all"],
            "venkatap@avalonconsult.com"          : ["guest", "all"],
            "wahidm@avalonconsult.com"            : ["guest", "all"],
            "westermana@avalonconsult.com"        : ["guest", "all"],
            "wetzelt@avalonconsult.com"           : ["guest", "all"],
            "zapatad@avalonconsult.com"           : ["guest", "all"]
        };

        this.roleLookup = function(userEmail){
            if (userEmail && lookup.hasOwnProperty(userEmail)){
                return lookup[userEmail];
            }
        };

    });