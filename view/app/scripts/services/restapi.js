'use strict';

angular.module('app')
  .factory('RestAPI', ['$http', function ($http) {
    var BASE_URL = 'http://localhost:8888/';

    function patchDeferred (defer) {
      defer.always = function (callback) {
        defer.then(callback, callback);
      };
      return defer;
    }

    // Public API here
    return {
      get: function (urlCompl) {
        var url = BASE_URL + urlCompl;
        var defer = $http.get(url);
        return patchDeferred(defer);
      },
      create: function (urlCompl, data) {
        var url = BASE_URL + urlCompl;
        var defer = $http.post(url, data);
        return patchDeferred(defer);
      }
    };
  }]);
