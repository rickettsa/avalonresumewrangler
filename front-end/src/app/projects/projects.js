angular.module( 'resumeWrangler.projects', [
  'ui.router',
  'placeholders',
  'ui.bootstrap'
])
  .config(function config( $stateProvider ) {
    $stateProvider
      .state( 'projects', {
        url: '/projects',
        views: {
          "main": {
            controller: 'ProjectsCtrl',
            templateUrl: 'projects/projects.tpl.html'
          }
        },
        resolve: {
          projectResponse: function(projectsCRUDService){
            return projectsCRUDService.fetchProject('0000000005');
          },
          skillsResponse: function(SkillsService){
            return SkillsService.fetchSkills();
          }
        },
        data:{ pageTitle: 'Edit Project'
        }
      });
  })
  .controller('ProjectsCtrl', function ($http, $scope, $filter, $state, projectResponse, skillsResponse, projectsCRUDService) {

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

    $scope.project = projectResponse.data.Project;

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
    };

    $scope.getAvatarImgName = function(emailAddr){
      var getEmailPrefix = function(str, group1){
        return group1.toLowerCase();
      };
      var consultantNameAbbrev = emailAddr.replace(/^(.*)@.*$/, getEmailPrefix);
      var imgSrc = '/assets/avatars/' + consultantNameAbbrev + '.jpg';
      return imgSrc;
    };

    $scope.goToResume = function(email){
      var params = {};
      params.email = email;
      $state.go('edit', params);
    };

    $scope.addConsultant = function(){
      var emptyConsultant = {
        "filledBy": {
          "ContactInfo": {
            "PersonName": {
              "id": "00000000000",
              "GivenName": "GivenName",
              "FamilyName": "FamilyName"
            },
            "ContactMethod": {
              "Mobile": "000-000-0000",
              "Fax": "555-444-3333",
              "InternetEmailAddress": "generic@avalonconsult.com",
              "PostalAddress": {
                "City": "Nowhere",
                "State": "ZZ"
              }
            }
          }
        },
        "PositionTitle": "Position Title",
        "PositionResponsibilies": "Position Responsibilities",
        "CompetenciesRequired": {
          "Competency": []
        }
      };
      $scope.project.PositionHistory.Position.push(emptyConsultant);
    };


    $scope.updateProject = function(){
      projectsCRUDService.updateProject($scope.project.id, $scope.project)
        .success(function(){
          console.log("updateProject SUCCESS");
        })
        .error(function(){
          console.log("updateProject FAILED");
        });
    };

  });
