(function(){
  'use strict';

  angular
    .module('resumeWrangler.edit')
    .controller('EditCtrl', EditCtrl);

    EditCtrl.$inject = ['$http', '$scope', '$filter', 'resumeResponse', 'skillsResponse', 'AppConfig', 'contactResponse', 'resumeService', 'skillsService'];

    function EditCtrl ($http, $scope, $filter, resumeResponse, skillsResponse, AppConfig, contactResponse, resumeService, skillsService) {

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

        if(resumeResponse.data.hits.length > 0){
            console.log("more than one")
            $scope.resume = resumeResponse.data.hits[0]._source;
        }else {
            var createResumePromise = resumeService.createResume();

            createResumePromise.then(function (resp) {
                $scope.global.resumeId = resp.data.id;
                $scope.global.rwUserId = $scope.resume.userId;
            }, function (error) {
                console.log("getNextPage error!");
                console.log(error);
            });
            console.log("we get the fake")
            $scope.resume = AppConfig.FAKE_RESUME._source;
        }


      $scope.contact = typeof contactResponse.data.hits === "object" && contactResponse.data.hits > 0 ? contactResponse.data.hits[0]._source : {};

      $scope.edit = {};



      $scope.edit.skillsData = skillsResponse.data.skills;
      $scope.edit.skillNames = _.pluck(skillsResponse.data.skills, 'dispName');
      $scope.edit.showSkillName = 0;

      //Make sure you save the resume for the user as they navigate away
      $scope.$on("$destroy", function(){
        $scope.edit.updateResume();
      });


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

        //x-editable setup
      $scope.user = {
        name: 'awesome user'
      };

      $scope.text = function($scope){
        $scope.text = 'this is text';
      };

      //https://github.com/Siyfion/angular-typeahead


     $scope.groups = [];


      $scope.edit.removeSkill = function(index, competencyArray) {
        competencyArray.splice(index, 1);
      };

    // add user
      $scope.edit.addSkillRole = function(competencyArray) {
        $scope.inserted = {
          abbrev: '',
          CompetencyDisplayName: null,
          CompetencyEvidence: null
        };
        competencyArray.unshift($scope.inserted);
      };

      // add user
      $scope.edit.addLifeSkillRole = function(competencyArray) {
        $scope.inserted = {
          abbrev: '',
          CompetencyDisplayName: null,
          YearsExperience: null
        };
        competencyArray.unshift($scope.inserted);
      };

      $scope.edit.addExperience = function(addPosition){
        var blankExperience = {
          "positionType": "contract",
          "clientName": "Client Name",
          "clientProjectId": "",
          "projectId": "",
          "title": "Postition Title",
          "description": "Description of my role in the project.",
          "startDate": "1800-01-01",
          "endDate": "1900-01-01",
          "skills": []
        };
        if (!_.isEmpty(addPosition) && addPosition === "end"){
          $scope.resume.employmentHistory[0].positions.push(blankExperience);
        } else {
          $scope.resume.employmentHistory[0].positions.unshift(blankExperience);
        }
      };

      $scope.edit.editSkill = function(skillRole){
        skillRole.isEditing = true;
      };

      $scope.edit.saveSkills = function(skills, currentSkillRole){
        currentSkillRole.isEditing = false;
        $scope.edit.updateResume();
      };

      $scope.edit.updateResume = function(){
        console.log($scope.global.resumeId)
        console.log($scope.resume)
        resumeService.updateResume($scope.global.resumeId, $scope.resume)
          .success(function(){

            //is this skill known? if not, make sure you post back to the skills API

            console.log("updateResume SUCCESS");
          })
          .error(function(){
            console.log("updateResume FAILED");
          });
      };

    };

})();
