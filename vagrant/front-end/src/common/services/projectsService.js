/**
 * @ngdoc service
 * @name resumeWrangler.resumeCRUDService
 * @description Create,Read,Update,Delete service for resume JSON from backend.
 */




  "use strict";

  angular
    .module('resumeWrangler')
    .service('projectsService', projectsService)

    function projectsService($rootScope, $http, configuration) {

      var service = {
        fetchProject  : fetchProject,
        fetchProjects : fetchProjects,
        updateProject : updateProject
      };

      return service;

      /**
       * Get summary list of a specific projects
       * @returns {promise}
       */
      function fetchProject(projectId) {
        return $http({
          method : "GET",
          url    : configuration.api + '/api/projects/' + projectId + '?expand_user_info=true'
        });
      };


      //fuzzy search function --pending review
      function fetchProjects (query) {
        var uri = encodeURI(query);
        var url = configuration.api + '/api/projects/search?q=';

        if (!_.isEmpty(query)){
            url +=  uri;
        }

        return $http({
          method : "GET",
          url    : url
        });
      };

       function updateProject(id, payload) {
        return $http({
          method  : "PUT",
          headers : {'Content-Type': 'application/json'},
          url     : configuration.api + '/api/projects/' + id,
          data    : payload
        });
      };
  };




    /**
       * Get summary list of all projects
       * @returns {promise}
       */
      // function fetchProjects (skill) {
      //   var url = configuration.api + '/api/projects/search?expand_user_info=true';

      //   if (!_.isEmpty(skill)){
      //       url += '?project_skills=' + skill;
      //   }

      //   return $http({
      //     method : "GET",
      //     url    : url
      //   });
      // };
