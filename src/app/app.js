angular.module( 'resumeWrangler', [
  'templates-app',
  'templates-common',
  'resumeWrangler.home',
  'resumeWrangler.edit',
  'resumeWrangler.projects',
  'ui.router',
  'ui.bootstrap',
  'xeditable',
  'siyfion.sfTypeahead',
  'ngSanitize'
])

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

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})

.run( function(editableOptions, $rootScope){
    editableOptions.theme = 'bs3'; //xeditable option to use bootstrap 3
    var uiRouterDebug = 0;

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

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | resumeWrangler' ;
    }
  });
})

;

