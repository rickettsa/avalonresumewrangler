angular.module( 'resumeWrangler.view', [
        'ui.router',
        'placeholders',
        'ui.bootstrap'
    ])
    .config(function config( $stateProvider ) {
      $stateProvider
        .state( 'view', {
            url: '/view',
            views: {
              "main": {
                controller: 'ViewCtrl',
                templateUrl: 'view/view.tpl.html'
              }
            },
            resolve: {
              resumeResponse: function(resumeCRUDService){
                return resumeCRUDService.fetchResume('0000000124');
              },
              skillsResponse: function(SkillsService){
                return SkillsService.fetchSkills();
              }
            },
            data:{ pageTitle: 'View Resume' }
      });
    })
    .controller('ViewCtrl', function ($http, $scope, $filter, resumeResponse, skillsResponse) {

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

      $scope.resume = resumeResponse.data.Resume.StructuredXMLResume;

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

  });