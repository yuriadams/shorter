'use strict';

xdescribe('Service: httpauthinterceptor', function () {

  // load the service's module
  beforeEach(module('myindaiaFrontApp'));

  // instantiate service
  var httpauthinterceptor;
  beforeEach(inject(function (_httpauthinterceptor_) {
    httpauthinterceptor = _httpauthinterceptor_;
  }));

  it('should do something', function () {
    expect(!!httpauthinterceptor).toBe(true);
  });

});
