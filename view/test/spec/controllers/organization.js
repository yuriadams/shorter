'use strict';

describe('Controller: OrganizationCtrl', function () {

  // load the controller's module
  beforeEach(module('myindaiaFrontApp'));

  var OrganizationCtrl,
    scope,
    httpBackend,
    growl,
    gettext,
    indaia,
    greenmile;

  beforeEach(inject(function ($controller, $rootScope, _growl_, $httpBackend, _gettext_) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    growl = _growl_,
    gettext = _gettext_;

    indaia = {
      'id': 1,
      'name': 'Indaia Logistica Internacional',
      'taxID': '123'
    };

    greenmile = {
      'id': 2,
      'name': 'GreenMile',
      'taxID': '1234'
    };

    scope.organization = {
      'name': 'Tanto Faz',
      'taxID': 'Nao importa'
    };

    spyOn(growl, 'success');
    spyOn(growl, 'error');

    OrganizationCtrl = $controller('OrganizationCtrl', {
      $scope: scope,
      growl: growl,
      gettext: gettext
    });
  }));

  it('should show growl success message when create successfuly organization',
      function () {
    httpBackend.when('POST', 'http://127.0.0.1:8080/myindaia-api/organization')
      .respond(200);
    httpBackend.when('GET', 'http://127.0.0.1:8080/myindaia-api/organization')
      .respond([indaia, greenmile]);
    OrganizationCtrl.save();
    httpBackend.flush();
    expect(growl.success).toHaveBeenCalled();
  });

  it('should show growl error message when theres an error on saving',
      function () {
    httpBackend.when('POST', 'http://127.0.0.1:8080/myindaia-api/organization')
      .respond(500);
    httpBackend.when('GET', 'http://127.0.0.1:8080/myindaia-api/organization')
      .respond([indaia, greenmile]);
    OrganizationCtrl.save();
    httpBackend.flush();
    expect(growl.error).toHaveBeenCalled();
  });

  it('should add a organization on client side list when the user adds a new organization', function() {
    httpBackend.when('POST', 'http://127.0.0.1:8080/myindaia-api/organization')
      .respond(200);
    httpBackend.when('GET', 'http://127.0.0.1:8080/myindaia-api/organization')
      .respond([indaia, greenmile]);
    httpBackend.flush();
    expect(scope.gridOptions.data.length).toBe(2);
    scope.add();
    expect(scope.gridOptions.data.length).toBe(3);
  });

  it('should be in create mode when load the controller', function() {
    expect(scope.action).toBe('create');
  });

  it('should be in edit mode when edit grid', function() {
    var row = {
      'entity': {}
    };
    scope.gridEdit(row);
    expect(scope.action).toBe('edit');
  });

  it('should copy the entity of the row to the controller when edit the grid', function() {
    var row = {
      'entity': indaia
    };
    scope.gridEdit(row);
    expect(scope.organization).toEqual(indaia);
  });

  it('should delete the entity on the list', function() {
    httpBackend.when('GET', 'http://127.0.0.1:8080/myindaia-api/organization')
      .respond([indaia, greenmile]);
      httpBackend.when('DELETE', 'http://127.0.0.1:8080/myindaia-api/organization/1')
      .respond(200);
    var row = {
      'entity': indaia
    };
    scope.gridRemove(row);
    httpBackend.flush();
    expect(scope.gridOptions.data.length).toBe(1);
    expect(growl.success).toHaveBeenCalled()
  });

  it('should update the entity on the list', function() {
    httpBackend.when('GET', 'http://127.0.0.1:8080/myindaia-api/organization')
      .respond([indaia, greenmile]);
    httpBackend.when('PUT', 'http://127.0.0.1:8080/myindaia-api/organization')
      .respond(200);

    var edited = {
      'id': 1,
      'name': 'Indaia Mudado',
      'taxID': '9999'
    };
    angular.copy(edited, scope.organization);
    scope.update()
    httpBackend.flush();
    expect(scope.organization).toEqual({});
    expect(scope.gridOptions.data.length).toBe(2);
    expect(scope.gridOptions.data[0]).toEqual(edited);
    expect(growl.success).toHaveBeenCalled()
  });

  it('should show name, taxID and actions on the grid', function() {
    var columns = [
      { field: 'name', name: gettext('name') },
      { field: 'taxID', name: gettext('taxID') },
      { name: 'Actions', cellTemplate: 'partials/gridActions.html', width: '*',
        enableFiltering: false},
    ];
    expect(scope.columnsSelected).toEqual(columns);
  });

  it('should enable sorting and filtering on the grid', function() {
    expect(scope.gridOptions.enableSorting).toBe(true);
    expect(scope.gridOptions.enableFiltering).toBe(true);
  });

});
