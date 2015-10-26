'use strict';

describe('Controller: CustomerCtrl', function () {
  beforeEach(module('myindaiaFrontApp'));

  var CustomerCtrl,
    scope,
    httpBackend,
    growl,
    gettext,
    basf,
    basfWithId,
    nestle,
    fisica,
    juridica,
    canada,
    jamaica,
    defaultGroup;

  beforeEach(inject(function ($controller, $rootScope, _growl_, $httpBackend, _gettext_) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend,
    growl = _growl_,
    gettext = _gettext_;

    basf = {"id":null,"taxID":"48539407008950","name":"BASF S.A ( VINHEDO )","aKey":"00009","address":{"street":"RUA EDGAR MARCHIORI. - SETOR BASF","number":"255","city":"VINHEDO","state":"SP","zipCode":"13280000","neighborhood":"Distrito Industrial","country":{"id":36,"aKey":"105","name":"BRASIL                                                                                                                  "}},"group":{"id":1,"name":"Grupo Padrão","cp":{"id":2,"descricao":"CP Padrão","withCashRequest":true,"sendToBank":true,"costCenter":"4050","consolidatedBilling":true,"consolidatedInvoice":true,"financialAccount":"3010","loadDITax":true}},"fone":"13 3211 4000","fax":"13 3211 4020","inscEstadual":"714105604110","inscMunicipal":"ISENTO","authKey":null,"type":"JURIDICA","seniorKey":"2016","cp":{"id":2,"descricao":"CP Padrão","withCashRequest":true,"sendToBank":true,"costCenter":"4050","consolidatedBilling":true,"consolidatedInvoice":true,"financialAccount":"3010","loadDITax":true}};
    nestle = {"id":null,"taxID":"60409075001558","name":"NESTLE BRASIL LTDA ( ARARAQUARA )","aKey":"00780","address":{"street":"RUA BAHIA","number":"100","city":"ARARAQUARA","state":"SP","zipCode":"14810170","neighborhood":"Vila Xavier","country":{"id":36,"aKey":"105","name":"BRASIL                                                                                                                  "}},"group":{"id":1,"name":"Grupo Padrão","cp":{"id":2,"descricao":"CP Padrão","withCashRequest":true,"sendToBank":true,"costCenter":"4050","consolidatedBilling":true,"consolidatedInvoice":true,"financialAccount":"3010","loadDITax":true}},"fone":"(016) 33051900","fax":"(016) 33051900","inscEstadual":"181002695116","inscMunicipal":"ISENTO","authKey":null,"type":"JURIDICA","seniorKey":"1284","cp":{"id":2,"descricao":"CP Padrão","withCashRequest":true,"sendToBank":true,"costCenter":"4050","consolidatedBilling":true,"consolidatedInvoice":true,"financialAccount":"3010","loadDITax":true}};

    basfWithId = {"id":10,"taxID":"48539407008950","name":"BASF S.A ( VINHEDO )","aKey":"00009","address":{"street":"RUA EDGAR MARCHIORI. - SETOR BASF","number":"255","city":"VINHEDO","state":"SP","zipCode":"13280000","neighborhood":"Distrito Industrial","country":{"id":36,"aKey":"105","name":"BRASIL                                                                                                                  "}},"group":{"id":1,"name":"Grupo Padrão","cp":{"id":2,"descricao":"CP Padrão","withCashRequest":true,"sendToBank":true,"costCenter":"4050","consolidatedBilling":true,"consolidatedInvoice":true,"financialAccount":"3010","loadDITax":true}},"fone":"13 3211 4000","fax":"13 3211 4020","inscEstadual":"714105604110","inscMunicipal":"ISENTO","authKey":null,"type":"JURIDICA","seniorKey":"2016","cp":{"id":2,"descricao":"CP Padrão","withCashRequest":true,"sendToBank":true,"costCenter":"4050","consolidatedBilling":true,"consolidatedInvoice":true,"financialAccount":"3010","loadDITax":true}};

    fisica = "FISICA";
    juridica = "JURIDICA";

    canada = {"id":1,"aKey":"001","name":"CANADA"};
    jamaica = {"id":2,"aKey":"002","name":"JAMAICA"};

    defaultGroup = [{"id":1,"name":"Grupo Padrão","cp":{"id":2,"descricao":"CP Padrão","withCashRequest":true,"sendToBank":true,"costCenter":"4050","consolidatedBilling":true,"consolidatedInvoice":true,"financialAccount":"3010","loadDITax":true}}];

    spyOn(growl, 'success');
    spyOn(growl, 'error');

    CustomerCtrl = $controller('CustomerCtrl', {
      $scope: scope,
      growl: growl,
      gettext: gettext
    });
  }));

  describe("create", function(){
    it('should fill a list of brazilian states on create', function () {
      var ufs = ['AC','AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
         'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS',
         'RO', 'RR', 'SC', 'SE', 'SP', 'TO'];
      expect(scope.ufs.length).toBe(ufs.length);
      expect(scope.ufs).toEqual(ufs);
    });

    it('should enable sorting on grid', function() {
      expect(scope.gridOptions.enableSorting).toBeTruthy();
    });

    it('should enable filtering on grid', function() {
      expect(scope.gridOptions.enableFiltering).toBeTruthy();
    });

    it('should be in action create action on create', function() {
      expect(scope.action).toBe(gettext('create'));
    });

    it('should let user change the page size between 25,50,75', function() {
      expect(scope.gridOptions.paginationPageSizes).toEqual([25,50,75]);
    });

    it('should have 25 as the default page size', function() {
      expect(scope.gridOptions.paginationPageSize).toBe(25);
    });
  });

  describe("loadAllCustomers", function(){
    beforeEach(function(){
      httpBackend.when('GET', 'http://127.0.0.1:8080/myindaia-api/customer/types/')
        .respond([]);
      httpBackend.when('GET', 'http://127.0.0.1:8080/myindaia-api/country')
        .respond([]);
      httpBackend.when('GET', 'http://127.0.0.1:8080/myindaia-api/customerGroup')
        .respond([]);
    });

    describe("when success", function(){
      beforeEach(function(){
        httpBackend.when('GET', 'http://127.0.0.1:8080/myindaia-api/customer').respond([basf, nestle]);
        httpBackend.flush();
      });

      it('load all customers', function() {
        expect(scope.gridOptions.data).toEqual([basf, nestle]);
      });
      it('not call error message', function() {
        expect(growl.success).not.toHaveBeenCalled();
      });
    });

    describe("when failed", function(){
      beforeEach(function(){
        httpBackend.when('GET', 'http://127.0.0.1:8080/myindaia-api/customer').respond(500);
        httpBackend.flush();
      });

      it('call error message', function() {
        expect(growl.error).toHaveBeenCalled();
      });
    });
  });

  describe("loadAllTypes", function(){
    beforeEach(function(){
      httpBackend.when('GET', 'http://127.0.0.1:8080/myindaia-api/customer')
        .respond([basf, nestle]);
      httpBackend.when('GET', 'http://127.0.0.1:8080/myindaia-api/country')
        .respond([canada, jamaica]);
      httpBackend.when('GET', 'http://127.0.0.1:8080/myindaia-api/customerGroup')
        .respond([]);
    });

    describe("when successfuly", function(){
      beforeEach(function(){
        httpBackend.when('GET', 'http://127.0.0.1:8080/myindaia-api/customer/types/')
          .respond([fisica, juridica]);
        httpBackend.flush();
      });
    });

    describe("when failed", function(){
      beforeEach(function(){
        httpBackend.when('GET', 'http://127.0.0.1:8080/myindaia-api/customer/types/')
          .respond(500);
        httpBackend.flush();
      });
    });
  });

  describe("loadAllCountries", function(){
    beforeEach(function(){
      httpBackend.when('GET', 'http://127.0.0.1:8080/myindaia-api/customer')
        .respond([basf, nestle]);
      httpBackend.when('GET', 'http://127.0.0.1:8080/myindaia-api/customer/types/')
        .respond([fisica, juridica]);
      httpBackend.when('GET', 'http://127.0.0.1:8080/myindaia-api/customerGroup')
        .respond([]);
    });

    describe("when success", function(){
      beforeEach(function(){
        httpBackend.when('GET', 'http://127.0.0.1:8080/myindaia-api/country').respond([canada, jamaica]);
        httpBackend.flush();
      });

      it('should load all countries on create', function() {
        expect(scope.countries).toEqual([canada, jamaica]);
      });
    });

    describe("when failed", function(){
      beforeEach(function(){
        httpBackend.when('GET', 'http://127.0.0.1:8080/myindaia-api/country').respond(500);
        httpBackend.flush();
      });

      it('call error message', function() {
        expect(growl.error).toHaveBeenCalled();
      });
    });
  });

  describe("loadAllGroups", function(){
    beforeEach(function(){
      httpBackend.when('GET', 'http://127.0.0.1:8080/myindaia-api/customer')
        .respond([basf, nestle]);
      httpBackend.when('GET', 'http://127.0.0.1:8080/myindaia-api/customer/types/')
        .respond([fisica, juridica]);
      httpBackend.when('GET', 'http://127.0.0.1:8080/myindaia-api/country')
        .respond([canada, jamaica]);
    });

    describe("when successfuly", function(){
      beforeEach(function(){
        httpBackend.when('GET', 'http://127.0.0.1:8080/myindaia-api/customerGroup').respond(defaultGroup);
        httpBackend.flush();
      });

      it('should load all customer groups on create', function() {
        expect(scope.customerGroups).toEqual(defaultGroup);
      });
    });

    describe("when failed", function(){
      beforeEach(function(){
        httpBackend.when('GET', 'http://127.0.0.1:8080/myindaia-api/customerGroup').respond(500);
        httpBackend.flush();
      });

      it('call error message', function() {
        expect(growl.error).toHaveBeenCalled();
      });
    });
  });

  describe("save", function(){
    beforeEach(function(){
      httpBackend.when('GET', 'http://127.0.0.1:8080/myindaia-api/customer')
        .respond([]);
      httpBackend.when('GET', 'http://127.0.0.1:8080/myindaia-api/customer/types/')
        .respond([]);
      httpBackend.when('GET', 'http://127.0.0.1:8080/myindaia-api/country')
        .respond([]);
      httpBackend.when('GET', 'http://127.0.0.1:8080/myindaia-api/customerGroup')
        .respond([]);

      scope.customer = basf;
    });

    describe("when successfuly", function(){
      beforeEach(function(){
        spyOn(scope, 'clear');
        httpBackend.when('POST', 'http://127.0.0.1:8080/myindaia-api/customer').respond({entities: [basf]});
        CustomerCtrl.save();
        httpBackend.flush();
      });

      it('should show growl success when save the customer on backend', function() {
        expect(growl.success).toHaveBeenCalled();
      });

      it('pushes the new customer on the gridOptions', function() {
        expect(scope.gridOptions.data).toContain(basf);
      });
    });

    describe("when failed", function(){
      beforeEach(function(){
        httpBackend.when('POST', 'http://127.0.0.1:8080/myindaia-api/customer').respond(500);
        CustomerCtrl.save();
        httpBackend.flush();
      });

      it('call error message', function() {
        expect(growl.error).toHaveBeenCalled();
      });
    });
  });

  describe("update", function(){
    beforeEach(function(){
      httpBackend.when('GET', 'http://127.0.0.1:8080/myindaia-api/customer')
        .respond([]);
      httpBackend.when('GET', 'http://127.0.0.1:8080/myindaia-api/customer/types/')
        .respond([]);
      httpBackend.when('GET', 'http://127.0.0.1:8080/myindaia-api/country')
        .respond([]);
      httpBackend.when('GET', 'http://127.0.0.1:8080/myindaia-api/customerGroup')
        .respond([]);

      scope.customer = basf;
    });

    describe("when successfuly", function(){
      beforeEach(function(){
        spyOn(scope, 'clear');
        httpBackend.when('PUT', 'http://127.0.0.1:8080/myindaia-api/customer').respond({entities: [basf]});
        scope.update();
        httpBackend.flush();
      });

      it('should show growl success when save the customer on backend', function() {
        expect(growl.success).toHaveBeenCalled();
      });
    });

    describe("when failed", function(){
      beforeEach(function(){
        httpBackend.when('PUT', 'http://127.0.0.1:8080/myindaia-api/customer').respond(500);
        scope.update();
        httpBackend.flush();
      });

      it('call error message', function() {
        expect(growl.error).toHaveBeenCalled();
      });
    });

  });

  describe("gridEdit", function(){
    beforeEach(function(){
      scope.gridEdit({
        entity: {
          address: {
            state: "glenio"
          }
        }
      });
    });

    it("scope action has to be equal 'edit'", function(){
      expect(scope.action).toEqual('edit');
    });

    it("selectedState has to be equal to customers state", function(){
      expect(scope.selectedState).toEqual('glenio');
    });
  });

  describe("gridRemove", function(){
    describe("update", function(){
      var customerId = 1;

      beforeEach(function(){
        httpBackend.when('GET', 'http://127.0.0.1:8080/myindaia-api/customer')
          .respond([]);
        httpBackend.when('GET', 'http://127.0.0.1:8080/myindaia-api/customer/types/')
          .respond([]);
        httpBackend.when('GET', 'http://127.0.0.1:8080/myindaia-api/country')
          .respond([]);
        httpBackend.when('GET', 'http://127.0.0.1:8080/myindaia-api/customerGroup')
          .respond([]);
      });

      describe("when successfuly", function(){
        beforeEach(function(){
          spyOn(scope, 'clear');
          httpBackend.when('DELETE', "http://127.0.0.1:8080/myindaia-api/customer/" + customerId).respond(200);
          scope.gridRemove({ entity: { id: customerId } });
          httpBackend.flush();
        });

        it('should show growl success when save the customer on backend', function() {
          expect(growl.success).toHaveBeenCalled();
        });
      });

      describe("when failed", function(){
        beforeEach(function(){
          httpBackend.when('DELETE', "http://127.0.0.1:8080/myindaia-api/customer/" + customerId).respond(500);
          scope.gridRemove({ entity: { id: 1 } });
          httpBackend.flush();
        });

        it('call error message', function() {
          expect(growl.error).toHaveBeenCalled();
        });
      });

    });
  });

  describe("clear", function(){
    beforeEach(function(){
      scope.formCustomer = {
        $setPristine: function() {}
      };
      scope.clear();
    });

    it("blanks customer", function(){
      expect(scope.customer).toEqual({});
    });

    it("blanks selectedState", function(){
      expect(scope.selectedState).toEqual({});
    });

    it("set action scope to 'create'", function(){
      expect(scope.action).toEqual('create');
    });
  });

  describe("isSave", function(){
    var cp = { entities: ["zuruca", "tecao", "andurinha"] }

    it("returns true if cp has entities", function(){
      expect(CustomerCtrl.isSave(cp)).toBeTruthy();
    });
  });
});
