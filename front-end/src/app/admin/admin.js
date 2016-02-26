"use strict";

/**
 * @ngdoc module
 * @name resumeWrangler.admin
 * @description Controls Editing of the master admin list.
 */

angular.module('resumeWrangler.admin', [
        'ui.router',
        'placeholders',
        'ui.bootstrap'
    ])
    .config(function config($stateProvider) {
        $stateProvider
            .state('admin', {
                url: '/admin',
                views: {
                    "main": {
                        controller: 'adminCtrl',
                        templateUrl: 'admin/admin.tpl.html'
                    }
                },
                resolve: {
                    adminResponse: function (contactsService) {
                        //return adminService.fetchadmin();
                    }
                },
                data: {
                    "pageTitle": "Administrator",
                    "authorizedRoles": ["editor", "admin"]
                }
            });
    })
    .controller('adminCtrl', function ($http, $scope, $filter, $timeout,
                                       adminResponse,
                                       contactsService) {

        $scope.admin = $scope.admin || {};
        //$scope.admin.adminResponse = adminResponse.data.admin;

        $scope.admin.douser = function () {
            var createUserPromise = contactsService.createUser($scope.admin.createUser);
            createUserPromise.then(function (resp) {
                console.log(resp);
                console.log(resp.data);
            }, function (error) {
                console.log("getNextPage error!");
                console.log(error);
            });
        }

        });
