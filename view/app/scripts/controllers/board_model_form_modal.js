angular.module('app').controller("BoardModelModalCtrl", ['$scope',
                                                                          'RestAPI',
                                                                          '$modalInstance',
                                                                          'board_model',
                                                                          'growl',
                                                                          'gettext',
  function($scope, RestAPI, $modalInstance, board_model, growl, gettext) {
    $scope.board_model = {};
    $scope.gate_models = [];

    this.initComponent = function() {
      $scope.loadGateModels();
      if(Object.keys(board_model).length > 0) { $scope.loadBoardModel(board_model.id); }
    };

    $scope.loadBoardModel = function(boardModelId){
      RestAPI.get('board_models', boardModelId).then(function(board_model) {
        $scope.action = 'edit';
        angular.copy($scope.constructJsonRadioModel(board_model.data), $scope.board_model);
      }, function() {
        growl.error(gettext('Error loading.'), {ttl: 3000});
      });
    };

    $scope.constructJsonRadioModel = function(boardModelData){
      var json = {}
      json['id'] = boardModelData.id;
      json['name'] = boardModelData.name;
      json['capacity'] = boardModelData.capacity;
      boardModelData.board_model_gate_layout.forEach(function(b){ json[b.gate_model.name] = b.quantity; })
      return json
    }

    $scope.resetBoardLayout = function(gate_model, disabled){
      if(disabled){ delete $scope.board_model[gate_model.name] }
    };

    $scope.readOnlyBoardLayout = function(gate_model, disabled){
      return $scope.board_model[gate_model.name] > 0 && !disabled;
    };

    $scope.add = function() {
      RestAPI.create('board_models', RestAPI.createRequestFrom($scope.board_model)).then(function(board_model) {
        $modalInstance.close(board_model.data);
        angular.copy(board_model.data, $scope.board_model);
        growl.success(gettext('Board Model successfuly saved.'), {ttl: 3000});
      }, function(){
        growl.error(gettext('Error saving Board Model.'), {ttl: 3000});
      });
    };

    $scope.edit = function() {
      RestAPI.update('board_models', RestAPI.createRequestFrom($scope.board_model), $scope.board_model.id).then(function(board_model) {
        $modalInstance.close(board_model.data);
        growl.success(gettext('Board Model successfuly saved.'), {ttl: 3000});
        }, function(){
        growl.error(gettext('Error saving Board Model.'), {ttl: 3000});
      });
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

    $scope.loadGateModels = function() {
      RestAPI.get('gate_models').then(function(gate_model) {
        $scope.gate_models = gate_model.data;
      }, function() {
        growl.error(gettext('Error loading gate_models.'), {ttl: 3000});
      });
    };

    this.initComponent();
  }]);
