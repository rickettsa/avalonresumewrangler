(function(){
  'use strict';

  angular
    .module('resumeWrangler.view')
    .config(configFunction);

    configFunction.$inject = ['$stateProvider'];

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
    }

    resumeResponse.$inject = ['resumeService', '$stateParams'];
    function resumeResponse(resumeService, $stateParams){
      if ($stateParams.firstName && $stateParams.lastName){
        return resumeService.fetchResume($stateParams.firstName, $stateParams.lastName);
      } else {
        return {};
      }
    }

    contactResponse.$inject = ['contactsService', '$stateParams'];
    function contactResponse(contactsService, $stateParams){
      if ($stateParams.firstName && $stateParams.lastName){
        return contactsService.fetchContactByName($stateParams.firstName, $stateParams.lastName);
      } else {
        return {};
      }
    }

    skillsResponse.$inject = ['skillsService', '$stateParams'];
    function skillsResponse(skillsService){
      return skillsService.fetchSkills();
    }

})();



