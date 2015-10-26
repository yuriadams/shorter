'use strict';

describe('Controller: LoginCtrl', function () {

  beforeEach(module('myindaiaFrontApp'));

  var LoginCtrl,
    controller,
    scope,
    httpBackend,
    location,
    localStorage,
    settings,
    authService;

  beforeEach(inject(function ($controller, $rootScope, $httpBackend, $location, $localStorage,
      _settings_, _auth_) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    location = $location;
    localStorage = $localStorage;
    settings = _settings_;
    authService = _auth_;
    authService.$localStorage = localStorage;
    controller = $controller;
  }));

  it('should go to main view if the token is valid on create', function () {
    var authToken = {access_token: 'pegou_o_pe_do_mestre_fora_do_tatame', type: 'Beared', life: 3600};
    localStorage.auth = authToken;
    LoginCtrl = controller('LoginCtrl', {
      $scope: scope,
      $location: location,
      $localStorage: localStorage,
      auth: authService
    });
    httpBackend.when('GET', settings.VALIDATE_URL + authToken.access_token).respond(200);
    httpBackend.flush();
    expect(location.path()).toEqual('/main');
  });

  it('should logout when when the token is not valid on create', function() {
    spyOn(authService, 'logout');
    var authToken = {access_token: 'yurizao', type: 'Beared', life: 3600};
    localStorage.auth = authToken;
    LoginCtrl = controller('LoginCtrl', {
      $scope: scope,
      $location: location,
      $localStorage: localStorage,
      auth: authService
    });
    httpBackend.when('GET', settings.VALIDATE_URL + authToken.access_token).respond(404);
    httpBackend.flush();
    expect(authService.logout).toHaveBeenCalled();
  });
});
