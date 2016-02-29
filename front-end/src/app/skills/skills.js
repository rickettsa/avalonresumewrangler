"use strict";

/**
 * @ngdoc module
 * @name resumeWrangler.skills
 * @description Controls Editing of the master skills list.
 */

angular.module('resumeWrangler.skills', [
    'ui.router',
    'placeholders',
    'ui.bootstrap'
])
    .config(function config($stateProvider) {
        $stateProvider
            .state('skills', {
                url: '/skills',
                views: {
                    "main": {
                        controller: 'SkillsCtrl',
                        templateUrl: 'skills/skills.tpl.html'
                    }
                },
                resolve: {
                    skillsResponse: function(skillsService) {
                        return skillsService.fetchSkills();
                    },
                    stacksResponse: function(skillsService) {
                        return skillsService.fetchStacks();
                    },
                    stackPositionResponse: function(skillsService) {
                        return skillsService.fetchStackPositions();
                    }
                },
                data: { "pageTitle": "Edit Resume",
                    "authorizedRoles": ["editor", "admin"]
                }
            });
    })
    .controller('SkillsCtrl', function($http, $scope, $filter, $timeout, skillsResponse, stacksResponse, stackPositionResponse, skillsService) {

        _.mixin({
            /**
             * @name findBySubVal
             * @description returns collection of nested field objects, matching a sub-level that contain specific values for a given property
             * @param {Object} collection - associatedNodes from the Graph Visualizer API payload
             * @param {string} property - the name of the property whose specific values we want to return
             * @param {Array} values - specific values of the property whose parent node we want to return
             *
             */
            findBySubVal: function(collection, property, values) {
                return _.filter(collection, function(item) {
                    return _.contains(values, item[property]);
                });
            }
        });

        $scope.skills = $scope.skills || {};

        $scope.skills.skillFilters = [
            {"name": "Front End",
                "value": "front-end"
            },
            {"name": "Back End",
                "value": "back-end"
            },
            {"name": "MiddleWare",
                "value": "middleware"
            },
            {"name": "Bug Reporting",
                "value": "bug-reporting"
            },
            {"name": "Full Stack",
                "value": "full-stack"
            },
            {"name": "IDE",
                "value": "ide"
            },
            {"name": "Curated",
                "value": "curated"
            },
            {"name": "Uncurated",
                "value": "uncurated"
            }
        ];

        $scope.skills.selectSkill = function(key, value) {
            $scope.skills.currentSkill = value;
            $scope.skills.currentSkill.normName = key;
            $scope.skills.modes.editingExistingSkill = 1;
            $scope.skillDetails.$setPristine();
        };

        $scope.skills.getSkillImg = function(skillName) {
            var skillNode = _.findBySubVal($scope.skillsData, 'dispName', [skillName]);
            if (skillNode.length > 0) {
                $scope.showSkillName = 0;
                return '/assets/icons/' + skillNode[0].image;
            } else {
                $scope.showSkillName = 1;
                return '/assets/icons/generic.jpg';
            }

        }

        $scope.skills.removeSkill = function(index, competencyArray) {
            competencyArray.splice(index, 1);
        };

        $scope.skills.addSkill = function() {
            $scope.skills.currentSkill = {
                "newSkillName": {
                    "dispName": "",
                    "image": "",
                    "stackPositions": [],
                    "stackNames": [],
                    "curated": "true",
                    "descr": ""
                }
            };
        };

        $scope.skills.saveSkill = function(skills) {
            $scope.skills.inserted = {
                "dispName": $scope.skills.currentSkill.dispName,
                "image": $scope.skills.currentSkill.image,
                "stackPositions": $scope.skills.currentSkill.stackPositions,
                "stackNames": $scope.skills.currentSkill.stackNames,
                "curated": "true",
                "descr": $scope.skills.currentSkill.descr
            };

            $scope.skills.updateSkill($scope.skills.currentSkill.normName, $scope.skills.inserted);
            $scope.skillDetails.$setPristine();
        };

        $scope.skills.updateSkill = function(id, payload) {
            skillsService.updateSkill(id, payload)
                .success(function() {
                    //is this skill known? if not, make sure you post back to the skills API
                    console.log("updateResume SUCCESS");
                })
                .error(function() {
                    console.log("updateResume FAILED");
                });
        };

        $scope.skills.togglePos = function(member) {
            $scope.skillDetails.skillImg.$setDirty();
            //group already contains this member, remove
            if (_.includes($scope.skills.currentSkill.stackPositions, member.id)) {
                //this function modifies the group array
                var removed = _.remove($scope.skills.currentSkill.stackPositions, function(n) {
                    return n === member.id;
                });
            } else {
                $scope.skills.currentSkill.stackPositions.push(member.id);
            }
        };

        $scope.skills.toggleStack = function(member) {
            $scope.skillDetails.skillImg.$setDirty();
            //group already contains this member, remove
            if (_.includes($scope.skills.currentSkill.stackNames, member.id)) {
                //this function modifies the group array
                var removed = _.remove($scope.skills.currentSkill.stackNames, function(n) {
                    return n === member.id;
                });
            } else {
                $scope.skills.currentSkill.stackNames.push(member.id);
            }
        };

        $scope.skills.isPosSelected = function(pos) {
            if (_.includes($scope.skills.currentSkill.stackPositions, pos.id)) {
                return 'selected';
            }
        };

        $scope.skills.isStackSelected = function(stack) {
            if (_.includes($scope.skills.currentSkill.stackNames, stack.id)) {
                return 'selected';
            }
        };

        $scope.skills.isSkillSelected = function(key) {
            if ($scope.skills.currentSkill.normName === key) {
                return 'selected';
            }
        };

        $scope.skills.resetUI = function(){
            $scope.skills.skillsMasterList = skillsResponse.data.skills;
            $scope.skillNames = _.pluck(skillsResponse.data.skills, 'dispName');
            $scope.skills.currentSkill = {};
            $scope.skills.skillListFilter = '';
            $scope.skills.currentSkill.stackPositions = [];
            $scope.skills.currentSkill.stackNames = [];
            $scope.skills.modes = {};
            $scope.skills.modes.editingExistingSkill = 0;
            $scope.skills.modes.addStackPosition = 0;
            $scope.skills.modes.addStackName = 0;
            $scope.skills.normNameRegex = new RegExp(/^[-a-zA-Z\.0-9_\+]+$/);
            $scope.skills.stacks = stacksResponse.data.stacks;
            $scope.skills.positions = stackPositionResponse.data.positions;
            $scope.skills.formEl = {};
        };
        $scope.skills.resetUI();

        $scope.skills.addStackPosition = function(){
            var normalizedId = $scope.skills.formEl.stackPositionDispName.replace(/[^a-zA-Z0-9]/g, "_");
            var payload = {
                "id": normalizedId,
                "dispName": $scope.skills.formEl.stackPositionDispName,
                "descr": $scope.skills.formEl.stackPositionDescr
            };
            //add to interface before posting to backend
            $scope.skills.positions.unshift(payload);
            var addSkillPromise = skillsService.createStackPosition();
            addSkillPromise.then(function(resp){
                //do nothing successfully added!
            }, function(err){
                console.log(err);
            });
        };

        $scope.skills.addStackName = function(){
            var normalizedId = $scope.skills.formEl.stackDispName.replace(/[^a-zA-Z0-9]/g, "_");
            var payload = {
                "id": normalizedId,
                "dispName": $scope.skills.formEl.stackDispName,
                "descr": $scope.skills.formEl.stackDescr
            };
            //add to interface before posting to backend
            $scope.skills.stacks.unshift(payload);
            var addSkillPromise = skillsService.createStack();
            addSkillPromise.then(function(resp){
                //do nothing successfully added!
            }, function(err){
                console.log(err);
            });
        };

    });
