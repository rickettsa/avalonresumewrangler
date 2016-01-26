/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'resumeWrangler.home', [
  'ui.router',
  'plusOne',
  'AppConfig'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
    $stateProvider
      .state('home', {
        url: '/home',
        views: {
          "main": {
            controller: 'HomeCtrl',
            templateUrl: 'home/home.tpl.html'
          }
        },
        resolve: {
          searchResponse: function() {
            return {};
          }
        },
        data: {"pageTitle": "Home",
               "authorizedRoles": ['all', 'editor', 'admin']
        }
      })
      .state('searchResults', {
        url: '/search-results?:query&:type&:skill&:last&:proj',
        params: {
          query: {
            value: null,
            squash: true
          },
          type: {
            value: null,
            squash: true
          }
        },
        views: {
          "main": {
            controller: 'SearchResultsCtrl',
            templateUrl: 'home/home.searchResults.tpl.html'
          }
        },
        resolve: {
          searchResponse: function($rootScope, resumeService, projectService, $stateParams){
            if ($stateParams.type === "Skill"){
                if (!_.isEmpty($stateParams.query)){
                  return resumeService.runQuery($stateParams.query);
                } else if (!_.isEmpty($rootScope.global.search.cachedSearch.query)){
                  return resumeService.runQuery($rootScope.global.search.cachedSearch.query);
                }
            } else if ($stateParams.type === "Last Name"){
                if (!_.isEmpty($stateParams.query)){
                  return resumeService.fetchResume(null,$stateParams.query);
                } else if (!_.isEmpty($rootScope.global.search.cachedSearch.query)){
                  return resumeService.fetchResume(null,$rootScope.global.search.cachedSearch.query);
                }
            } else if ($stateParams.type === "Project"){
                if (!_.isEmpty($stateParams.query)){
                  return resumeService.fetchProject($stateParams.query);
                } else if (!_.isEmpty($rootScope.global.search.cachedSearch.query)){
                  return resumeService.fetchProject($rootScope.global.search.cachedSearch.query);
                }
            }
          }
        },
        data: {"pageTitle": "Search Results",
          "authorizedRoles": ['all', 'editor', 'admin']
        }
      });
  })

/**
 * And of course we define a controller for our route.
 */
.controller( 'HomeCtrl', function HomeController( $scope, $rootScope) {

})


.controller( 'SearchResultsCtrl', function SearchResultsCtrl( $scope, searchResponse, $rootScope, $stateParams, AppConfig, $filter ) {

    $scope.searchResponse = searchResponse.data.hits;
    $scope.global.search.query = $rootScope.cachedSearch && $rootScope.cachedSearch.query ? $rootScope.cachedSearch.query : ''; //this is needed for 1st view of search results, so highlight works

    $scope.currentSearch = {};
    $scope.search = {};

    $scope.search.config = AppConfig.search;


    if (!_.isEmpty($stateParams.query)){
      $scope.global.search.query = $stateParams.query;
    }

    $scope.rearrangeArrayByQuery = function(inputArr){
      //find array elems that match query
      var filtered = $filter('filter')(inputArr, $scope.global.search.query);
      //remove those elements from original array
      _.remove(inputArr, function (el) {
        return _.indexOf(filtered, el) !== -1;
      });
      //add those elements to the beginning of array
      var sorted = filtered.concat(inputArr);
      return sorted;
    }


    $scope.getAvatarImgName = function(emailAddr){
      if (emailAddr && !_.isEmpty(emailAddr)){
        var getEmailPrefix = function(str, group1){
          return group1.toLowerCase();
        };
        var consultantNameAbbrev = emailAddr.replace(/^(.*)@.*$/, getEmailPrefix);
        var imgSrc = '/assets/avatars/' + consultantNameAbbrev + '.jpg';
        return imgSrc;
      }
    };

    $scope.search.getMostRecentPosition = function(data, key){
        if (!_.isEmpty(data)){
          var mostRecentEmployer = data[data.length - 1];
          var mostRecentPosition = mostRecentEmployer.positions[mostRecentEmployer.positions.length - 1];
          if (_.has(mostRecentPosition, key)){
            return mostRecentPosition[key];
          } else {
            return 'empty';
          }
        }
    };

});

