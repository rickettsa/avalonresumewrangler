angular.module( 'resumeWrangler', [
  'templates-app',
  'templates-common',
  'resumeWrangler.home',
  'resumeWrangler.edit',
  'ui.router',
  'xeditable'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})

.run( function(editableOptions){
    editableOptions.theme = 'bs3'; //xeditable option to use bootstrap 3
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

