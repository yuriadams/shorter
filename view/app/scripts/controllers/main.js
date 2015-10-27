'use strict';

/**
 * @ngdoc function
 * @name app.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('MainCtrl', ['$scope',
                          'RestAPI',
                          'growl',
                          'gettext',

  function ($scope, RestAPI, growl, gettext) {
    $scope.stats_list = [];

    this.initComponent = function() {
      $scope.loadStats();
    };

    $scope.loadStats = function() {
      RestAPI.get('api/stats').then(function(stats) {
        $scope.stats_list = stats.data;
      }, function() {
        growl.error(gettext('Error loading stats.'), {ttl: 3000});
      });
    };

    this.initComponent();

  }]);
