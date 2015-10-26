'use strict';

xdescribe('Service: branch', function () {

  // load the service's module
  beforeEach(module('myindaiaFrontApp'));

  // instantiate service
  var branch;
  beforeEach(inject(function (_branch_) {
    branch = _branch_;
  }));

  it('should do something', function () {
    expect(!!branch).toBe(true);
  });

});
