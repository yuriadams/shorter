'use strict';

xdescribe('Controller: BranchCtrl', function () {

  // load the controller's module
  beforeEach(module('myindaiaFrontApp'));

  var BranchCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BranchCtrl = $controller('BranchCtrl', {
      $scope: scope
    });
  }));

  xit('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
