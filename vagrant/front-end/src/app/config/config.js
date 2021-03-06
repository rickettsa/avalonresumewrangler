"use strict";

angular.module('AppConfig', [])
  .provider('AppConfig', function() {
    var config = {};

    config.search = {};
    config.search.skillsDispLimit = 4;

    config.stackPositions = ["front-end", "back-end", "middleware", "search-engine", "bug-reporting", "IDE"];

    config.stackNames = ["ELK", "Java", "MEAN", "LAMP", "NodeJs"];

    /**** START CONSTANTS ****/
    config.AUTH_EVENTS = {
      loginSuccess: 'auth-login-success',
      loginFailed: 'auth-login-failed',
      logoutSuccess: 'auth-logout-success',
      sessionTimeout: 'auth-session-timeout',
      notAuthenticated: 'auth-not-authenticated',
      notAuthorized: 'auth-not-authorized'
    };

    config.USER_ROLES = {
      all: '*',
      admin: 'admin',
      editor: 'editor',
      guest: 'guest'
    };

    config.FAKE_RESUME = {
        "_source": {
            "educationHistory": [
                {
                    "degreeMajor": "Your Degree",
                    "degreeName": "BS",
                    "endDate": "1999-01-02",
                    "schoolName": "Your School",
                    "startDate": "1999-01-01"
                }
            ],
            "employmentHistory": [
                {
                    "employerOrgName": "Avalon Consulting, LLC",
                    "employeeSuperTitle" : "Consultant",
                    "employeeProfessionalSummary"  : "High level description of your expertise and experience as a consultant in Avalon Consulting LLC",
                    "positions": [
                        {
                            "clientName": "Johnson, Smith, and Jones Law Firm",
                            "clientProjectId": "221a43b2c2",
                            "description": "<p>This is a description of consultant's work on this client project.</p>",
                            "endDate": "2014-12-31",
                            "positionType": "contract",
                            "startDate": "2013-01-01"
                        }
                    ]
                }

            ],
            "firstName": "",
            "lastName": "",
            "email": "@avalonconsult.com",
            "phone": "444-555-8888",
            "city": "Burbank",
            "state": "CA",
            "skills": [
                {
                    "name": "Python",
                    "years": 10
                },
                {
                    "name": "Flask",
                    "years": 4
                }
            ]
        },
        "_type": "resume",
        "_version": 1,
        "found": true
    };


     config.EMPTY_RESUME = {
        "_source": {
          "educationHistory": [
            {
              "degreeMajor" : "Your Degree",
              "degreeName"  : "BS",
              "endDate"     : "1999-01-02",
              "schoolName"  : "Your School",
              "startDate"   : "1999-01-01"
            }
          ],
          "employmentHistory": [
            {
              "employerOrgName": "Avalon Consulting, LLC",
              "employeeSuperTitle" : "Consultant",
              "employeeProfessionalSummary":"High level description of your expertise and experience as a consultant in Avalon Consulting LLC",
              "positions": [
                {
                  "positionType"     : "contract",
                  "clientName"       : "",
                  "clientProjectId"  : "",
                  "title"            : "Postition Title",
                  "description"      : "<p>This is a description of consultant's work on this client project.</p>",
                  "startDate"        : "1999-01-02",
                  "endDate"          : "1999-01-02"
                }
              ]
            }
          ],
          "firstName" : "",
          "lastName"  : "",
          "email"     : "",
          "phone"     : "000-000-0000",
          "city"      : "",
          "state"     : "",
          "skills": [
            {
              "name"  : "",
              "years" : 0
            }
          ]
        },
        "_type"    : "resume",
        "_version" : 1,
        "found"    : true
      }


    /**** END CONSTANTS ****/

    return {
      $get: function () {
        return config;
      }
    };
  });

