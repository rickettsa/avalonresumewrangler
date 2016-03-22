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

 (function(){
  'use strict';

  angular
    .module('resumeWrangler.home', [
      'ui.router',
      'plusOne',
      'AppConfig'
    ])

 })();


/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */

 (function(){
  'use strict';

  angular
    .module('resumeWrangler.home')
    .config(configFunction);

    configFunction.$inject =['$stateProvider'];

    function configFunction($stateProvider){
       $stateProvider
      .state('home', {
        url   : '/home',
        views : {
          "main": {
            controller  : 'HomeCtrl',
            templateUrl : 'home/home.tpl.html'
          }
        },
        resolve: {
          searchResponse: function() {
            return {};
          }
        },
        data: {
          "pageTitle"       : "Home",
          "authorizedRoles" : ['all', 'editor', 'admin']
        }
      })
      .state('searchResults', {
        url: '/search-results?:query&:type&:skill&:last&:proj',
        params: {
          query: {
            value  : null,
            squash : true
          },
          type: {
            value  : null,
            squash : true
          }
        },
        views: {
          "main": {
            controller  : 'SearchResultsCtrl',
            templateUrl : 'home/home.searchResults.tpl.html'
          }
        },
        resolve: {
          searchResponse: searchResponse
        },
        data: {
          "pageTitle"       : "Search Results",
          "authorizedRoles" : ['all', 'editor', 'admin']
        }
      });
    }

    searchResponse.$inject = ['$rootScope', 'resumeService', 'projectsService', '$stateParams'];
    function searchResponse($rootScope, resumeService, projectsService, $stateParams){
      if ($stateParams.type === "Skill"){
          if (!_.isEmpty($stateParams.query)){
            return resumeService.skillSearch($stateParams.query);
          } else if (!_.isEmpty($rootScope.global.search.cachedSearch.query)){
            return resumeService.skillSearch($rootScope.global.search.cachedSearch.query);
          }
      } else if ($stateParams.type === "Last Name"){
          if (!_.isEmpty($stateParams.query)){
            return resumeService.fetchResume(null,$stateParams.query);
          } else if (!_.isEmpty($rootScope.global.search.cachedSearch.query)){
            return resumeService.fetchResume(null,$rootScope.global.search.cachedSearch.query);
          }
      } else if ($stateParams.type === "Project"){
          if (!_.isEmpty($stateParams.query)){
            return projectsService.fetchProjects($stateParams.query);
          } else if (!_.isEmpty($rootScope.global.search.cachedSearch.query)){
            return projectsService.fetchProjects($rootScope.global.search.cachedSearch.query);
          }
      }
    }
 })();


/**
 * And of course we define a controller for our route.
 */
(function(){
  'use strict';

  angular
    .module('resumeWrangler.home')
    .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject =['$scope', '$rootScope'];

    function HomeCtrl($scope, $rootScope){

    };
})();

(function(){
  'use strict';

  angular
    .module('resumeWrangler.home')
    .controller('SearchResultsCtrl', SearchResultsCtrl);

  SearchResultsCtrl.$inject =['$scope', 'searchResponse', '$rootScope', '$stateParams', 'AppConfig', '$filter'];

  function SearchResultsCtrl( $scope, searchResponse, $rootScope, $stateParams, AppConfig, $filter ) {

    //bindable members
    $scope.searchResponse                = searchResponse.data.hits;
    $scope.currentSearch                 = {};
    $scope.search                        = {};
    $scope.search.config                 = AppConfig.search;
    $scope.search.getMostRecentPosition  = getMostRecentPosition;
    $scope.rearrangeArrayByQuery         = rearrangeArrayByQuery;
    $scope.getAvatarImgName              = getAvatarImgName;
    $scope.global.search.query           = $rootScope.cachedSearch && $rootScope.cachedSearch.query ? $rootScope.cachedSearch.query : ''; //this is needed for 1st view of search results, so highlight works


    if (!_.isEmpty($stateParams.query)){
      $scope.global.search.query = $stateParams.query;
    }

    function rearrangeArrayByQuery(inputArr){
      var filtered = $filter('filter')(inputArr, $scope.global.search.query);  //find array elems that match query
      _.remove(inputArr, function (el) {
        return _.indexOf(filtered, el) !== -1; //remove those elements from original array
      });
      var sorted = filtered.concat(inputArr); //add those elements to the beginning of array
        return sorted;
    }

    function getAvatarImgName (emailAddr){
      if(emailAddr && !_.isEmpty(emailAddr)){
        var getEmailPrefix = function(str, group1){
          return group1.toLowerCase();
      };

      var consultantNameAbbrev = emailAddr.replace(/^(.*)@.*$/, getEmailPrefix);
      var imgSrc = '/assets/avatars/' + consultantNameAbbrev + '.jpg';
        return imgSrc;
      }
    };

    function getMostRecentPosition(data, key){
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
  };
})();




