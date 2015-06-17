"use strict";

/**
 * @ngdoc module
 * @name resumeWrangler.skills
 * @description Controls Editing of the master skills list.
 */

angular.module( 'resumeWrangler.skills', [
  'ui.router',
  'placeholders',
  'ui.bootstrap'
])
  .config(function config( $stateProvider ) {
    $stateProvider
      .state( 'skills', {
        url: '/skills',
        views: {
          "main": {
            controller: 'SkillsCtrl',
            templateUrl: 'skills/skills.tpl.html'
          }
        },
        resolve: {
          skillsResponse: function(SkillsService){
            return SkillsService.fetchSkills();
          }
        },
        data:{ "pageTitle": "Edit Resume",
          "authorizedRoles": ["editor", "admin"]
        }
      });
  })
  .controller('SkillsCtrl', function ($http, $scope, $filter, skillsResponse, SkillsService) {

    _.mixin({
      /**
       * @name findBySubVal
       * @description returns collection of nested field objects, matching a sub-level that contain specific values for a given property
       * @param {Object} collection - associatedNodes from the Graph Visualizer API payload
       * @param {string} property - the name of the property whose specific values we want to return
       * @param {Array} values - specific values of the property whose parent node we want to return
       *
       */
      findBySubVal: function(collection, property, values) {
        return _.filter(collection, function(item) {
          return _.contains(values, item[property]);
        });
      }
    });

    $scope.skills = skillsResponse.data.skills;
    $scope.skillNames = _.pluck(skillsResponse.data.skills, 'dispName');

    $scope.skillFilters = [
      {"name": "Front End",
        "value": "front-end"
      },
      {"name": "Back End",
        "value": "back-end"
      },
      {"name": "MiddleWare",
        "value": "middleware"
      },
      {"name": "Bug Reporting",
        "value": "bug-reporting"
      },
      {"name": "Full Stack",
        "value": "full-stack"
      },
      {"name": "IDE",
        "value": "ide"
      }
    ];

    $scope.getSkillImg = function(skillName){
      var skillNode = _.findBySubVal($scope.skillsData, 'dispName', [skillName]);
      if (skillNode.length > 0){
        $scope.showSkillName = 0;
        return '/assets/icons/' + skillNode[0].image;
      } else {
        $scope.showSkillName = 1;
        return '/assets/icons/generic.jpg';
      }

    }

    $scope.removeSkill = function(index, competencyArray) {
      competencyArray.splice(index, 1);
    };

    $scope.addLifeSkillRole = function(competencyArray) {
      $scope.inserted = {
        abbrev: '',
        CompetencyDisplayName: null,
        YearsExperience: null
      };
      competencyArray.push($scope.inserted);
    };


    $scope.updateSkillsDB = function(){
      SkillsService.updateResume($scope.resume.ContactInfo.PersonName.id, $scope.resume)
        .success(function(){
          //is this skill known? if not, make sure you post back to the skills API
          console.log("updateResume SUCCESS");
        })
        .error(function(){
          console.log("updateResume FAILED");
        });
    };

  });
