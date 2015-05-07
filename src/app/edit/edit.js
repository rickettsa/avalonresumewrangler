angular.module( 'resumeWrangler.edit', [
        'ui.router',
        'placeholders',
        'ui.bootstrap'
    ])
    .config(function config( $stateProvider ) {
      $stateProvider
        .state( 'edit', {
            url: '/edit',
            views: {
              "main": {
                controller: 'EditCtrl',
                templateUrl: 'edit/edit.tpl.html'
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
            data:{ pageTitle: 'Edit Resume' }
      });
    })
    .controller('EditCtrl', function ($http, $scope, $filter, resumeResponse, skillsResponse) {

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

      $scope.skillsData = skillsResponse.data.skills;
      $scope.resume = resumeResponse.data.Resume.StructuredXMLResume;

      $scope.skillNames = _.pluck(skillsResponse.data.skills, 'dispName');
      $scope.getSkillImg = function(skillName){

        var skillNode = _.findBySubVal($scope.skillsData, 'dispName', [skillName]);
        return '/assets/icons/' + skillNode[0].image;
      }

      //x-editable setup
      $scope.user = {
        name: 'awesome user'
      };

      $scope.text = function($scope){
        $scope.text = 'this is text';
      };

    //https://github.com/Siyfion/angular-typeahead

    $scope.skillRoleMatrix = [
      {id: 1, name: 'awesome user1', skill: 'PHP'},
      {id: 2, name: 'awesome user2', skill: 'NodeJS'},
      {id: 3, name: 'awesome user3', skill: 'AngularJS'}
    ];

    $scope.statuses = [
      {value: 1, text: 'status1'},
      {value: 2, text: 'status2'},
      {value: 3, text: 'status3'},
      {value: 4, text: 'status4'}
    ];

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

//     ".net": {
//        "display-name": ".NET",
//          "image": "dotnet.jpg"
//      }

    //when user types in a skill name,
    //list image and skill names that match in typeahead

    $scope.showSkill = function(skillrow) {
      var selected = [];
      if(skillrow.skill) {
        selected = $filter('filter')($scope.skills, {value: skillrow.skill});
      }
      return selected.length ? selected[0].text : 'Not set';
    };

    $scope.checkName = function(data, id) {
      if (id === 2 && data !== 'awesome') {
        return "Username 2 should be `awesome`";
      }
    };

    $scope.saveUser = function(data, id) {
      //$scope.user not updated yet
      angular.extend(data, {id: id});
      //return $http.post('/saveUser', data);
    };

    // remove user
    $scope.removeUser = function(index) {
      $scope.skillRoleMatrix.splice(index, 1);
    };

    // add user
    $scope.addUser = function() {
      $scope.inserted = {
        id: $scope.skillRoleMatrix.length+1,
        name: '',
        status: null,
        group: null
      };
      $scope.skillRoleMatrix.push($scope.inserted);
    };

  });
