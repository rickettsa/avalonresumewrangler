"use strict";

/**
 * @ngdoc module
 * @name resumeWrangler.edit
 * @description Controls Editing of the user's resume.
 */

angular.module( 'resumeWrangler.edit', [
        'ui.router',
        'placeholders',
        'ui.bootstrap'
    ])
    .config(function config( $stateProvider ) {
      $stateProvider
        .state( 'edit', {
          url: '/edit?:firstName&:lastName',
          params: {
            firstName: {
              value: null,
              squash: true
            },
            lastName: {
              value: null,
              squash: true
            }
          },
          views: {
            "main": {
              controller: 'EditCtrl',
              templateUrl: 'edit/edit.tpl.html'
            }
          },
          resolve: {
            resumeResponse: function(resumeService, $stateParams){
              if ($stateParams.firstName && $stateParams.lastName){
                return resumeService.fetchResume($stateParams.firstName, $stateParams.lastName);
              } else {
                return {};
              }
            },
            contactResponse: function(contactsService, $stateParams){
              if ($stateParams.firstName && $stateParams.lastName){
                return contactsService.fetchContactByName($stateParams.firstName, $stateParams.lastName);
              } else {
                return {};
              }
            },
            skillsResponse: function(skillsService){
              return skillsService.fetchSkills();
            }
          },
            data:{ "pageTitle": "Edit Resume",
                   "authorizedRoles": ["editor", "admin"]
            }
      });
    })
    .controller('EditCtrl', function ($http, $scope, $filter, resumeResponse, skillsResponse, contactResponse, resumeService) {

      _.mixin({
        /**
         * @name findBySubVal
         * @description returns collection of nested field objects, matching a sub-level that contain specific values for a given property
         * @param {Object} collection - associatedNodes from the Graph Visualizer API payload
         * @param {string} property - the name of the property whose specific values we want to return
         * @param {Array} values - specific values of the property whose parent node we want to return
         */
        findBySubVal: function(collection, property, values) {
          return _.filter(collection, function(item) {
            return _.contains(values, item[property]);
          });
        }
      });

    $scope.resume = resumeResponse.data.hits[0]._source;
    $scope.global.rwUserId = $scope.resume.userId;
    $scope.global.resumeId = resumeResponse.data.hits[0]._id;
    $scope.contact = typeof contactResponse.data.hits === "object" ? contactResponse.data.hits[0]._source : {};



    console.log( typeof contactResponse);

      $scope.skillsData = skillsResponse.data.skills;
      $scope.skillNames = _.pluck(skillsResponse.data.skills, 'dispName');
      $scope.showSkillName = 0;
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

      //x-editable setup
      $scope.user = {
        name: 'awesome user'
      };

      $scope.text = function($scope){
        $scope.text = 'this is text';
      };

    //https://github.com/Siyfion/angular-typeahead


    $scope.groups = [];
    $scope.loadGroups = function() {
      return $scope.groups.length ? null : $http.get('/groups').success(function(data) {
        $scope.groups = data;
      });
    };

    $scope.showGroup = function(user) {
      if(user.group && $scope.groups.length) {
        var selected = $filter('filter')($scope.groups, {id: user.group});
        return selected.length ? selected[0].text : 'Not set';
      } else {
        return user.groupName || 'Not set';
      }
    };

    $scope.saveUser = function(data, id) {
      //$scope.user not updated yet
      angular.extend(data, {id: id});
      //return $http.post('/saveUser', data);
    };

    // remove user
    $scope.removeSkill = function(index, competencyArray) {
      competencyArray.splice(index, 1);
    };

    // add user
    $scope.addSkillRole = function(competencyArray) {
      $scope.inserted = {
        abbrev: '',
        CompetencyDisplayName: null,
        CompetencyEvidence: null
      };
      competencyArray.push($scope.inserted);
    };

    // add user
    $scope.addLifeSkillRole = function(competencyArray) {
      $scope.inserted = {
        abbrev: '',
        CompetencyDisplayName: null,
        YearsExperience: null
      };
      competencyArray.push($scope.inserted);
    };

    $scope.addExperience = function(addPosition){
      var blankExperience = {
        "positionType": "contract",
        "projectId": "",
        "Title": "Postition Title",
        "OrgName": {
          "OrganizationName": "Organization Name"
        },
        "Description": "Description of my role in the project.",
        "StartDate": "1800-01-01",
        "EndDate": "1900-01-01",
        "Competency": [
          {
            "id": "",
            "abbrev": "none",
            "CompetencyDisplayName": "Some Skill Name",
            "CompetencyEvidence": "Description of how skill was used"
          }
        ]
      };
      if (!_.isEmpty(addPosition) && addPosition === "end"){
        $scope.resume.employmentHistory[0].positions.push(blankExperience);
      } else {
        $scope.resume.employmentHistory[0].positions.unshift(blankExperience);
      }
    };


    $scope.updateResume = function(){
      resumeService.updateResume($scope.global.resumeId, $scope.resume)
        .success(function(){

          //is this skill known? if not, make sure you post back to the skills API

          console.log("updateResume SUCCESS");
        })
        .error(function(){
          console.log("updateResume FAILED");
        });
    };

  });
