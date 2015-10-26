'use strict';

xdescribe('Controller: BeneficiaryCtrl', function () {

  // load the controller's module
  beforeEach(module('myindaiaFrontApp'));

  var BeneficiaryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BeneficiaryCtrl = $controller('BeneficiaryCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
