'use strict';

angular.module('services.config', [])
  .constant('configuration', {
    api: '@@api',
    apiary: '@@apiary'
  });
