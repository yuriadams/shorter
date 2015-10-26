'use strict';

xdescribe('Controller: PaymentRequestCtrl', function () {

  // load the controller's module
  beforeEach(module('myindaiaFrontApp'));

  var PaymentRequestCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PaymentRequestCtrl = $controller('PaymentRequestCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
