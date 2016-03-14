(function(){
  'use strict';

  angular
    .module('resumeWrangler.edit')
    .config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    function configfunction( $stateProvider ) {
      $stateProvider
        .state( 'edit', {
          url: '/edit?:firstName&:lastName',
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
              controller  : 'EditCtrl',
              templateUrl : 'edit/edit.tpl.html'
            }
          },
          resolve: {
            resumeResponse  : resumeResponse,
            contactResponse : contactResponse,
            skillsResponse  : skillsResponse
          },
          data:{
            "pageTitle"       : "Edit Resume",
            "authorizedRoles" : ["editor", "admin"]
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

    contactResponse.$inject = ['skilssService', '$stateParams'];
    function skillsResponse(skillsService){
      return skillsService.fetchSkills();
    }

})();


