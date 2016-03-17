/**
 * @ngdoc module
 * @name resumeWrangler.edit
 * @description Controls Editing of the user's resume.
 */

(function(){
"use strict";

  angular
    .module( 'resumeWrangler.edit', [
    'ui.router',
    'placeholders',
    'ui.bootstrap'
  ])

})();


(function(){
  'use strict';

  angular
    .module('resumeWrangler.edit')
    .config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    function configFunction( $stateProvider ) {
      $stateProvider
        .state( 'edit', {
          url: '/edit?:firstName&:lastName',
          params: {
            firstName: {
              value  : null,
              squash : true
            },
            lastName: {
              value  : null,
              squash : true
            }
          },
          views: {
            "main": {
              controller  : 'EditCtrl',
              templateUrl : 'edit/edit.tpl.html'
            }
          },
          resolve: {
            resumeResponse  : resumeResponse,
            contactResponse : contactResponse,
            skillsResponse  : skillsResponse
          },
          data:{
            "pageTitle"       : "Edit Resume",
            "authorizedRoles" : ["editor", "admin"]
          }
      });
    }

    resumeResponse.$inject = ['resumeService', '$stateParams'];
    function resumeResponse(resumeService, $stateParams){
      if ($stateParams.firstName && $stateParams.lastName){
        return resumeService.fetchResume($stateParams.firstName, $stateParams.lastName);
      } else {
        return {};
      }
    }

    contactResponse.$inject = ['contactsService', '$stateParams'];
    function contactResponse(contactsService, $stateParams){
      if ($stateParams.firstName && $stateParams.lastName){
        return contactsService.fetchContactByName($stateParams.firstName, $stateParams.lastName);
      } else {
        return {};
      }
    }

    skillsResponse.$inject = ['skillsService', '$stateParams'];
    function skillsResponse(skillsService){
      return skillsService.fetchSkills();
    }

})();


(function(){
  'use strict';

  angular
    .module('resumeWrangler.edit')
    .controller('EditCtrl', EditCtrl);

    EditCtrl.$inject = ['$http', '$scope', '$filter', 'resumeResponse', 'skillsResponse', 'AppConfig', 'contactResponse', 'resumeService', '$stateParams',  'skillsService'];

    function EditCtrl ($http, $scope, $filter, resumeResponse, skillsResponse, AppConfig, contactResponse, resumeService,
      $stateParams, skillsService) {


      _.mixin({
        findBySubVal: function(collection, property, values) {
          return _.filter(collection, function(item) {
            return _.contains(values, item[property]);
          });
        }
      });


      // debugger
      if (resumeResponse.data.hits.length > 0) {
        $scope.resume = resumeResponse.data.hits[0]._source;
      } else {
        $scope.resume            = AppConfig.EMPTY_RESUME._source;
        $scope.resume.firstName  = $stateParams.firstName;
        $scope.resume.lastName   = $stateParams.lastName;

        resumeService.createResume()
          .then(function(response){
            console.log("SUCCESS: created resume id")
            console.log(response.data.id)
            $scope.global.resumeId = response.data.id

          }, function (error){
            console.log("getNextPage error!");
            console.log(error);
          });
      }


      $scope.edit                = {};
      $scope.edit.skillsData     = skillsResponse.data.skills;
      $scope.edit.skillNames     = _.pluck(skillsResponse.data.skills, 'dispName');
      $scope.edit.showSkillName  = 0;

      //Make sure you save the resume for the user as they navigate away
      $scope.$on("$destroy", function(){
        $scope.edit.updateResume();
      });

      $scope.edit.addExperience = function(addPosition){
        var blankExperience = {
          "positionType"     : "contract",
          "clientName"       : "Client Name",
          "clientProjectId"  : "",
          "projectId"        : "",
          "title"            : "Postition Title",
          "description"      : "Description of my role in the project.",
          "startDate"        : "1800-01-01",
          "endDate"          : "1900-01-01",
          "skills"           : []
        };
        if (!_.isEmpty(addPosition) && addPosition === "end"){
          $scope.resume.employmentHistory[0].positions.push(blankExperience);//what if more than one employmenthistory?
        } else {
          $scope.resume.employmentHistory[0].positions.unshift(blankExperience);
        }
      };


      $scope.edit.deletePosition = function(employmentHistoryIndex, positionIndex){
        debugger
        $scope.resume.employmentHistory[employmentHistoryIndex].positions.splice(positionIndex,1)
        $scope.edit.updateResume();
      }


      $scope.edit.getSkillImg = function(skill){
        var skillNode = _.findBySubVal($scope.edit.skillsData, 'dispName', [skill.name]);
        if (skillNode.length > 0 && skillNode[0].hasOwnProperty("image") && !_.isEmpty(skillNode[0].image)){
          $scope.showSkillName = 0;
          return '/assets/icons/' + skillNode[0].image;
        } else {
          $scope.showSkillName = 1;
          return '/assets/icons/generic.jpg';
        }
      }

       $scope.edit.removeSkill = function(index, competencyArray) {
        competencyArray.splice(index, 1);
      };

    // add user
      $scope.edit.addSkillRole = function(competencyArray) {
        $scope.inserted = {
          abbrev                : '',
          CompetencyDisplayName : null,
          CompetencyEvidence    : null
        };
        competencyArray.unshift($scope.inserted);
      };

      // add user
      $scope.edit.addLifeSkillRole = function(competencyArray) {
        $scope.inserted = {
          abbrev                : '',
          CompetencyDisplayName : null,
          YearsExperience       : null
        };
        competencyArray.unshift($scope.inserted);
      };


      $scope.edit.editSkill = function(skillRole){
        skillRole.isEditing = true;
      };

      $scope.edit.saveSkills = function(skills, currentSkillRole){
        currentSkillRole.isEditing = false;
        $scope.edit.updateResume();
      };

      $scope.edit.updateResume = function(){
        console.log("id")
        console.log($scope.global.resumeId)
        console.log("resume sent to put")
        console.log($scope.resume)
        resumeService.updateResume($scope.global.resumeId, $scope.resume)
          .success(function(resp){
            //is this skill known? if not, make sure you post back to the skills API
            console.log("updateResume SUCCESS");
          })
          .error(function(){
            console.log("updateResume FAILED");
          });
      };

      var suggestions = skillsService.getTypeaheadSource();
      suggestions.initialize();

      $scope.typeaheadOptions = { // Options for the Twitter typeahead
        highlight: true, // Highlight suggestions
        minLength: 2 // Don't start looking for suggestions until 3 chars are entered
      };

      $scope.typeaheadData = { // Data for the Twitter typeahead
        displayKey: 'displayName',
        suggestionKey: 'displayName',
        source: suggestions.ttAdapter(),
        templates: {
          empty: '<div class="ds-empty-message">There are no suggestions for your query</div>',
          header: '<span>Suggested Search Results</span>',
          /**
           * Suggestion template.
           * @param {Object} data
           * @returns {string}
           */
          suggestion: function(data) {
            return _.template('<p>${displayName}</p>')(data);
          }
        }
      };

      $scope.contact = typeof contactResponse.data.hits === "object" && contactResponse.data.hits > 0 ? contactResponse.data.hits[0]._source : {};

        //x-editable setup
      $scope.user = {
        name: 'awesome user'
      };

      $scope.text = function($scope){
        $scope.text = 'this is text';
      };

      //https://github.com/Siyfion/angular-typeahead

      $scope.groups = [];


    };

})();
