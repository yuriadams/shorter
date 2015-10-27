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
        debugger;
        var defer = $http.get(url);
        return patchDeferred(defer);
      },
      create: function (model, data) {
        var url = BASE_URL + model;
        var defer = $http.post(url, data);
        return patchDeferred(defer);
      },
      update: function (model, data, id) {
        var url = BASE_URL + model + "/" + id;
        var defer = $http.put(url, data);
        return patchDeferred(defer);
      }
    };
  }]);
