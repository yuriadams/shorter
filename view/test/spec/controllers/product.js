'use strict';

xdescribe('Controller: ProductCtrl', function () {

  // load the controller's module
  beforeEach(module('myindaiaFrontApp'));

  var ProductCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProductCtrl = $controller('ProductCtrl', {
      $scope: scope
    });
  }));

  xit('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
