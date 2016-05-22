angular.module( 'resumeWrangler.projects', [
  'ui.router',
  'placeholders',
  'ui.bootstrap'
])
  .config(function config( $stateProvider ) {
    $stateProvider
      .state( 'projects', {
        url: '/projects?:id',
        params: {
          id: {
            value: null,
            squash: true
          }
        },
        views: {
          "main": {
            controller: 'ProjectsCtrl',
            templateUrl: 'projects/projects.tpl.html'
          }
        },
        resolve: {
          projectResponse: function($stateParams, projectsService){
            return projectsService.fetchProject($stateParams.id);
          },
          skillsResponse: function(skillsService){
            return skillsService.fetchSkills();
          }
        },
        data:{ pageTitle: 'Edit Project',
          "authorizedRoles": ['project-editor', 'admin']
        }
      });
  })

  //https://confluence.avalonconsult.com/display/enterprisesearch/Projects

  .controller('ProjectsCtrl', function ($http, $scope, $filter, $state, projectResponse, skillsResponse, projectsService) {

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

    $scope.project = projectResponse.data._source;

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

    //Make sure you save the resume for the user as they navigate away
    $scope.$on("$destroy", function(){
      $scope.updateProject();
    });

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
        "filledBy": [
          {
            "startDate": "1000-01-01",
            "userId": "7cfdd141dc2cb94a12ee59f7aee6101f"
          }
        ],
        "positionSkills": [
          "Elasticsearch",
          "Python",
          "Flask"
        ],
        "responsibilities": "Consulting",
        "title": "Senior Consultant - Scrum Master"
      };
      $scope.project.positions.push(emptyConsultant);
    };


    $scope.updateProject = function(){
      projectsService.updateProject($scope.project.projectId, $scope.project)
        .success(function(){
          console.log("updateProject SUCCESS");
        })
        .error(function(){
          console.log("updateProject FAILED");
        });
    };

  });
