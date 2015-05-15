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
  'plusOne'
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
        data: {"pageTitle": "Home"}
      })
      .state('searchResults', {
        url: '/search-results',
        views: {
          "main": {
            controller: 'SearchResultsCtrl',
            templateUrl: 'home/home.searchResults.tpl.html'
          }
        },
        resolve: {
          searchResponse: function($rootScope, resumeCRUDService){
            return resumeCRUDService.runQuery($rootScope.cachedSearch);
          }
        },
        data: {"pageTitle": "Search Results"}
      });
  })

/**
 * And of course we define a controller for our route.
 */
.controller( 'HomeCtrl', function HomeController( $scope, $rootScope  ) {

})


.controller( 'SearchResultsCtrl', function SearchResultsCtrl( $scope, searchResponse, $rootScope  ) {

    $scope.searchResponse = searchResponse.data.ResumeSearchResults.Resume;
    $scope.query = $rootScope.cachedSearch && $rootScope.cachedSearch.query ? $rootScope.cachedSearch.query : ''; //this is needed for 1st view of search results, so highlight works

    $scope.currentSearch = {};

    //handles subsequent search requests after data is initially loaded
    $scope.$on('run-global-search', function(event, args){
      console.log("broadcast recieved: " + args.query);
      $scope.query = args.query;
    });

    $scope.$on('go', function () { alert('event is clicked') });

    $scope.getAvatarImgName = function(emailAddr){
      var getEmailPrefix = function(str, group1){
        return group1.toLowerCase();
      };
      var consultantNameAbbrev = emailAddr.replace(/^(.*)@.*$/, getEmailPrefix);
      var imgSrc = '/assets/avatars/' + consultantNameAbbrev + '.jpg';
      return imgSrc;
    };



});

