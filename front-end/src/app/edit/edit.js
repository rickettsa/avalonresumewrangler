/**
 * @ngdoc module
 * @name resumeWrangler.edit
 * @description Controls Editing of the user's resume.
 */

"use strict";

  angular
    .module( 'resumeWrangler.edit', [
      'ui.router',
      'placeholders',
      'ui.bootstrap'
    ])
    .config(configFunction)
    .controller('EditCtrl', EditCtrl);


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
    };

    function resumeResponse(resumeService, $stateParams){
      if ($stateParams.firstName && $stateParams.lastName){
        return resumeService.fetchResume($stateParams.firstName, $stateParams.lastName);
      } else {
        return {};
      }
    };

    function contactResponse(contactsService, $stateParams){
      if ($stateParams.firstName && $stateParams.lastName){
        return contactsService.fetchContactByName($stateParams.firstName, $stateParams.lastName);
      } else {
        return {};
      }
    };

    function skillsResponse(skillsService){
      return skillsService.fetchSkills();
    };

   // ------------------------------------
   // start Edit Controller
   // ------------------------------------
    function EditCtrl ($http, $scope, $filter, resumeResponse, skillsResponse, AppConfig, contactResponse, resumeService, $stateParams, skillsService, sessionService, configuration){

      $scope.edit = {};

      function initEdit(){
        if (resumeResponse.data.hits.length > 0) {
          $scope.resume = resumeResponse.data.hits[0]._source;
          $scope.global.resumeId = resumeResponse.data.hits[0]._id;

        } else {
          $scope.resume = AppConfig.EMPTY_RESUME._source;
          $scope.resume.email = sessionService.userEmail;
          $scope.resume.lastName = $stateParams.lastName;
          $scope.resume.firstName = $stateParams.firstName;

          var userId = sessionService.userId

          resumeService.createResume(userId).then(function(response){
              console.log("SUCCESS : created resume id")
              $scope.global.resumeId = response.data.id;
          }, function(error){
              console.log("ERROR :  getNextPage!");
              console.log(error);
          });
        }

        // bindable edit members
        $scope.edit.addExperience     = addExperience;
        $scope.edit.addEmployer       = addEmployer;
        $scope.edit.deletePosition    = deletePosition;
        $scope.edit.addEducation      = addEducation;
        $scope.edit.deleteEducation   = deleteEducation;
        $scope.edit.skillsData        = skillsResponse.data.skills;
        $scope.edit.skillNames        = _.pluck(skillsResponse.data.skills, 'dispName');
        $scope.edit.showSkillName     = 0;
        $scope.edit.getSkillImg       = getSkillImg;
        $scope.edit.removeSkill       = removeSkill;
        // $scope.edit.addSkillRole      = addSkillRole;
        $scope.edit.addLifeSkillRole  = addLifeSkillRole;
        $scope.edit.editSkill         = editSkill;
        $scope.edit.saveSkills        = saveSkills;
        $scope.edit.updateResume      = updateResume;
      };

      //CALL OUR METHOD==================
      initEdit();
      //=================================


     //Search projects api, debounce will execute function only if 100 milliseconds have passed to prevent hammering server, alternatively throttle can also be used and that will execute the function at most once every 100 mms 
      $scope.projects = _.debounce(function(projectName) {
        return $http({
          method : "GET",
          url    : configuration.api + '/api/projects/search?client_name=' + projectName
        })
          .then(function(response){
            return _.map(response.data.hits, function(hits){
              return hits
            })
          });
      },100);

      $scope.onSelect = function ($item, $model, $label, pos){
        var retriveProject = _.clone($item._source);      
        pos.clientName = retriveProject.clientName;
        pos.projectId - retriveProject.projectId;       
      }
      
       _.mixin({
        findBySubVal: function(collection, property, values) {
          return _.filter(collection, function(item) {
            return _.contains(values, item[property]);
          });
        }
      });

      // Make sure you save the resume for the user as they navigate away
      $scope.$on("$destroy", function(){
        $scope.edit.updateResume();
      });

      function addExperience (addPosition, index){
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
          $scope.resume.employmentHistory[index].positions.push(blankExperience);//what if more than one employmenthistory?
        } else {
          $scope.resume.employmentHistory[index].positions.unshift(blankExperience);
        }
      };

      function deletePosition (employmentHistoryIndex, positionIndex){
        $scope.resume.employmentHistory[employmentHistoryIndex].positions.splice(positionIndex,1)

        //delete employer if user deletes all positions
        if($scope.resume.employmentHistory[employmentHistoryIndex].positions.length === 0){
          console.log("eliminated employer!")
          $scope.resume.employmentHistory.splice(employmentHistoryIndex,1)
        }

        $scope.edit.updateResume();
      }

      function addEmployer(addPosition){
        var blankEmployer = {
          "employerOrgName": "",
          "positions": [
            {
              "positionType"     : "contract",
              "clientName"       : "Client Name",
              "clientProjectId"  : "",
              "projectId"        : "",
              "title"            : "Postition Title",
              "description"      : "Description of my role in the project.",
              "startDate"        : "1800-01-01",
              "endDate"          : "1900-01-01",
              "skills"           : []
            }
          ]
        }

        if (!_.isEmpty(addPosition) && addPosition === "end"){
          $scope.resume.employmentHistory.push(blankEmployer);
        } else {
          $scope.resume.employmentHistory.unshift(blankEmployer);
        }
      };

      function addEducation(addPosition){
        var blankEducation = {
          "degreeMajor"  : "Degree Mayor",
          "degreeName"   : "Degree Name",
          "schoolName"   : "School Name",
          "startDate"    : "1800-01-01",
          "endDate"      : "1900-01-01"
        };
        if (!_.isEmpty(addPosition) && addPosition === "end"){
          $scope.resume.educationHistory.push(blankEducation);
        } else {
          $scope.resume.educationHistory.unshift(blankEducation);
        }
      };

      function deleteEducation (index){
        $scope.resume.educationHistory.splice(index,1)
        $scope.edit.updateResume();
      };

      function getSkillImg(skill){
        var skillNode = _.findBySubVal($scope.edit.skillsData, 'dispName', [skill.name]);
        if (skillNode.length > 0 && skillNode[0].hasOwnProperty("image") && !_.isEmpty(skillNode[0].image)){
          $scope.showSkillName = 0;
          return '/assets/icons/' + skillNode[0].image;
        } else {
          $scope.showSkillName = 1;
          return '/assets/icons/generic.jpg';
        }
      };

      function removeSkill(index, competencyArray) {
        competencyArray.splice(index, 1);
      };

      function addSkillRole(competencyArray) {
        $scope.inserted = {
          abbrev                : '',
          CompetencyDisplayName : null,
          CompetencyEvidence    : null
        };
        competencyArray.unshift($scope.inserted);
      };

      function addLifeSkillRole(competencyArray) {
        var emptySkill = {
          "name": "Skill",
          "years": 0
        }
        competencyArray.unshift(emptySkill);
      };

      function editSkill(skillRole){
        skillRole.isEditing = true;
      };

      function saveSkills(skills, currentSkillRole){
        currentSkillRole.isEditing = false;
        $scope.edit.updateResume();
      };

      function updateResume(){
        $scope.resume.userId = sessionService.userId;

        if($scope.global.resumeId === undefined){
          console.log("undefined resume id!")
          return // false// if false return 500 //bubble to a 500
        }

        if($scope.resume.email === "" || $scope.resume.email === undefined){
          $scope.resume.email = sessionService.userEmail;
        }

        resumeService.updateResume($scope.global.resumeId, $scope.resume)
          .success(function(resp){
            //is this skill known? if not, make sure you post back to the skills API
            console.log("updateResume SUCCESS");
          })
          .error(function(){
            console.log("updateResume FAILED");
          });
      };

      $scope.contact = typeof contactResponse.data.hits === "object" && contactResponse.data.hits > 0 ? contactResponse.data.hits[0]._source : {};


      $scope.text = function($scope){
        $scope.text = 'this is text';
      };

    };


