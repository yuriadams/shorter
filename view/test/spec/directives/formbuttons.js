'use strict';

xdescribe('Directive: formButtons', function () {

  // load the directive's module
  beforeEach(module('myindaiaFrontApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<form-buttons></form-buttons>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the formButtons directive');
  }));
});
