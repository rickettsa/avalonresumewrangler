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
              }
            },
            data:{ pageTitle: 'Edit Resume' }
      });
    })
    .controller('EditCtrl', function ($scope, resumeResponse) {

      $scope.resume = resumeResponse.data.Resume.StructuredXMLResume;

      $scope.user = {
        name: 'awesome user'
      };

      $scope.text = function($scope){
        $scope.text = 'this is text';
      };

    });
