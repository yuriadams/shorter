'use strict';

describe('Service: restapi', function () {

  // load the service's module
  beforeEach(module('myindaiaFrontApp'));

  // instantiate service
  var restapi;
  beforeEach(inject(function (_restapi_) {
    restapi = _restapi_;
  }));

  xit('should do something', function () {
    expect(!!restapi).toBe(true);
  });

});
