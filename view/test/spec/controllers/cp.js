'use strict';

xdescribe('Controller: CpCtrl', function () {

  // load the controller's module
  beforeEach(module('myindaiaFrontApp'));

  var CpCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CpCtrl = $controller('CpCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
