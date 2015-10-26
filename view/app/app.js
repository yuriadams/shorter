'use strict';

var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
  return window._; //Underscore must already be loaded on the page
});

angular.module('app', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ngStorage',
    'ui.router',
    'ncy-angular-breadcrumb',
    'ui.bootstrap',
    'ui.utils',
    'gettext',
    'angular-growl',
    'schemaForm',
    'ngStorage',
    'underscore',
    'angular-md5',
    'ui.utils.masks',
    'angular-loading-bar'
]);

angular.module('app').run(function (gettextCatalog) {
    gettextCatalog.debug = true;
    gettextCatalog.setCurrentLanguage('pt_BR');
});
