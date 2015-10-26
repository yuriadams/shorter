'use strict';

xdescribe('Controller: ServiceCtrl', function () {

  // load the controller's module
  beforeEach(module('myindaiaFrontApp'));

  var ServiceCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ServiceCtrl = $controller('ServiceCtrl', {
      $scope: scope
    });
  }));

  xit('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
