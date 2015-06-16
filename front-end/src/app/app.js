angular.module( 'resumeWrangler', [
  'templates-app',
  'templates-common',
  'resumeWrangler.home',
  'resumeWrangler.edit',
  'resumeWrangler.projects',
  'resumeWrangler.view',
  'services.config',
  'ui.router',
  'ui.bootstrap',
  'xeditable',
  'siyfion.sfTypeahead',
  'ngSanitize',
  'AppConfig',
  'angular-loading-bar'
])

/**** START FILTERS ****/
  .filter('highlight', function () {
    return function (text, search, caseSensitive) {
      if (text && (search || angular.isNumber(search))) {
        text = text.toString();
        search = search.toString();
        if (caseSensitive) {
          return text.split(search).join('<span class="ui-match">' + search + '</span>');
        } else {
          return text.replace(new RegExp(search, 'gi'), '<span class="ui-match">$&</span>');
        }
      } else {
        return text;
      }
    };
  })

  .filter('excludeOthers', function(){
    return function(items, name){
      var arrayToReturn = [];
      for (var i=0; i<items.length; i++){
        if (items[i].type === name) {
          arrayToReturn.push(items[i]);
        }
      }
      return arrayToReturn;
    };
  })

/**** END FILTERS ****/

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
    //ui.router default
    $urlRouterProvider.otherwise( '/home' );

})

.run( function(editableOptions, $rootScope, configuration, AppConfig, LoginService){
    editableOptions.theme = 'bs3'; //xeditable option to use bootstrap 3
    var uiRouterDebug = 0;

    //https://medium.com/opinionated-angularjs/techniques-for-authentication-in-angularjs-applications-7bbf0346acec
    $rootScope.$on('$stateChangeStart', function (event, next) {
      console.log("Auth Check Starting...");

      var authorizedRoles = next.data.authorizedRoles;
      if (!LoginService.isAuthorized(authorizedRoles)) {
        event.preventDefault();
        if (LoginService.isAuthenticated()) {
          // user is not allowed
          //$rootScope.$broadcast(AppConfig.AUTH_EVENTS.notAuthorized);
          console.log("You do not have permissions to view this page!");
        } else {
          // user is not logged in
          //$rootScope.$broadcast(AppConfig.AUTH_EVENTS.notAuthenticated);
          console.log("You are not logged in!");
        }
      }
    });


    //http://stackoverflow.com/questions/20745761/what-is-the-angular-ui-router-lifecycle-for-debugging-silent-errors/20786262#20786262
    if (uiRouterDebug){
      /* START ui.router debug */
      $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
        console.log('$stateChangeStart to '+toState.to+'- transition begins. toState,toParams : \n',toState, toParams);
      });
      $rootScope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams, error){
        console.log('$stateChangeError - error occured during transition.');
        console.log(arguments);
      });
      $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
        console.log('$stateChangeSuccess to '+toState.name+'- state transition is complete.');
      });
      // $rootScope.$on('$viewContentLoading',function(event, viewConfig){
      //   // runs on individual scopes, so putting it in "run" doesn't work.
      //   console.log('$viewContentLoading - view begins loading - dom not rendered',viewConfig);
      // });
      $rootScope.$on('$viewContentLoaded',function(event){
        console.log('$viewContentLoaded - dom rendered',event);
      });
      $rootScope.$on('$stateNotFound',function(event, unfoundState, fromState, fromParams){
        console.log('$stateNotFound '+unfoundState.to+'  - fstate cannot be found by its name.');
        console.log(unfoundState, fromState, fromParams);
      });
      /* END ui.router debug */
    }
  }
)

.controller( 'AppCtrl', function AppCtrl ($scope, $location, LoginService) {

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | resumeWrangler' ;
    }
  });

  $scope.isAuthorized = function(roles){
         return LoginService.isAuthorized(roles);
  };

})

;

