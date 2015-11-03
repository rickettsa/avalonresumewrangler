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
          },
          stacksResponse: function(SkillsService){
            return SkillsService.fetchStacks();
          },
          stackPositionResponse: function(SkillsService){
            return SkillsService.fetchStackPositions();
          }
        },
        data:{ "pageTitle": "Edit Resume",
          "authorizedRoles": ["editor", "admin"]
        }
      });
  })
  .controller('SkillsCtrl', function ($http, $scope, $filter, $timeout,
                                      skillsResponse,
                                      stacksResponse,
                                      stackPositionResponse,
                                      SkillsService
    ){

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
    $scope.currentSkill = {};
    $scope.currentSkill.stackPositions = [];
    $scope.currentSkill.stackNames = [];
    $scope.editingExisting = 0;
    $scope.normNameRegex = new RegExp(/^[-a-zA-Z\.0-9_\+]+$/);

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
      },
      {"name": "Curated",
        "value": "curated"
      },
      {"name": "Uncurated",
        "value": "uncurated"
      }
    ];

    $scope.selectSkill = function(key, value){
      $scope.currentSkill = value;
      $scope.currentSkill.normName = key;
      $scope.editingExisting = 1;
      $scope.skillDetails.$setPristine();
    };

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

    $scope.addSkill = function() {
      $scope.currentSkill = {
        "newSkillName": {
          "dispName": "",
          "image": "",
          "stackPositions": [],
          "stackNames": [],
          "curated": "true",
          "descr": ""
        }
      };
    };

    $scope.saveSkill = function(skills) {
      $scope.inserted = {
        "$scope.currentSkill.normName": {
          "dispName": $scope.currentSkill.dispName,
          "image": $scope.currentSkill.image,
          "stackPositions": $scope.currentSkill.stackPositions,
          "stackNames": $scope.currentSkill.stackNames,
          "curated": "true",
          "descr": $scope.currentSkill.descr
        }
      };
        skills["$scope.currentSkill.normName"] = $scope.inserted;
        $scope.updateSkills($scope.skills);
        $scope.skillDetails.$setPristine();
    };

    $scope.updateSkills = function(){
      SkillsService.updateSkills($scope.skills)
        .success(function(){
          //is this skill known? if not, make sure you post back to the skills API
          console.log("updateResume SUCCESS");
        })
        .error(function(){
          console.log("updateResume FAILED");
        });
    };


    $scope.stacks = stacksResponse.data.stacks;
    $scope.positions = stackPositionResponse.data.positions;

    $scope.togglePos = function(member){
      //group already contains this member, remove
      if (_.includes($scope.currentSkill.stackPositions, member.id)){
            //this function modifies the group array
            var removed = _.remove($scope.currentSkill.stackPositions, function(n){
              return n === member.id;
            });
      } else {
        $scope.currentSkill.stackPositions.push(member.id);
      }
    };

    $scope.toggleStack = function(member){
      $scope.skillDetails.$setDirty();
      //group already contains this member, remove
      if (_.includes($scope.currentSkill.stackNames, member.id)){
        //this function modifies the group array
        var removed = _.remove($scope.currentSkill.stackNames, function(n){
          return n === member.id;
        });
      } else {
        $scope.currentSkill.stackNames.push(member.id);
      }
    };

    $scope.isPosSelected = function(pos){
      if (_.includes($scope.currentSkill.stackPositions, pos.id)){
        return 'selected';
      }
    };

    $scope.isStackSelected = function(stack){
      if (_.includes($scope.currentSkill.stackNames, stack.id)){
        return 'selected';
      }
    };

    $scope.isSkillSelected = function(key){
      if ($scope.currentSkill.normName === key){
        return 'selected';
      }
    };


  });
