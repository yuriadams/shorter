'use strict';

describe('Service: auth', function () {

  beforeEach(module('myindaiaFrontApp'));

  var auth,
  httpBackend,
  settings;

  beforeEach(inject(function (_auth_, $httpBackend, _settings_) {
    auth = _auth_;
    httpBackend = $httpBackend;
    settings = _settings_;
  }));

  it('should login using email and password', function () {
    var authToken = {access_token: 'faixa_preta_nosso', type: 'Beared', life: 3600};
    var login = 'hedleygois@myindaia.com.br';
    var password = '123';
    httpBackend.whenPOST(settings.LOGIN_URL,
      {email: login, password: password, grant_type: 'password'}).respond(authToken);
    var defered = auth.login(login, password);
    httpBackend.flush();
    expect(defered.$$state.value.data).toEqual(authToken);
  });

});
