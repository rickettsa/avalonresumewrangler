'use strict'

  angular.module( 'resumeWrangler.view', [
    'ui.router',
    'placeholders',
    'ui.bootstrap'
  ])
  .config(configFunction)
  .controller('ViewCtrl', ViewCtrl);


  function configFunction( $stateProvider ) {
    $stateProvider
      .state( 'view', {
        url: '/view?:firstName&:lastName',
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
            controller  : 'ViewCtrl',
            templateUrl : 'view/view.tpl.html'
          }
        },
        resolve: {
          resumeResponse  : resumeResponse,
          contactResponse : contactResponse,
          skillsResponse  : skillsResponse
        },
        data:{
          "pageTitle"       : 'View Resume',
          "authorizedRoles" : ['all', 'editor', 'admin']
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

  function ViewCtrl ($http, $scope, $filter, resumeResponse, skillsResponse, sessionService, AppConfig, contactResponse) {


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

    $scope.view = $scope.view || {};

    if(resumeResponse.data.hits.length > 0){
        $scope.resume = resumeResponse.data.hits[0]._source;
    }else {
        $scope.resume = AppConfig.FAKE_RESUME._source;
    }
    $scope.contact = contactResponse.data.hits && contactResponse.data.hits.length > 0 ? contactResponse.data.hits[0]._source : {};

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


    $scope.view.getSkillImg = function(skill){
      var skillNode = _.findBySubVal($scope.skillsData, 'dispName', [skill.name]);
      if (skillNode.length > 0 && skillNode[0].hasOwnProperty("image") && !_.isEmpty(skillNode[0].image)){
        $scope.showSkillName = 0;
        return '/assets/icons/' + skillNode[0].image;
      } else {
        $scope.showSkillName = 1;
        return '/assets/icons/generic.jpg';
      }
    };

   $scope.view.printPreview = function(){
      $('.navbar, .sideBar, .mainContent, .footer-inner').hide();
      $('.preview-resume-parent').removeClass('fade').addClass('inview');
    }

    $scope.view.closePreview = function(){
      $('.preview-resume-parent').removeClass('inview').addClass('fade');
      $('.navbar, .sideBar, .mainContent, .footer-inner').show();
    }
  };




