(function() {

  'use strict';

  var controllers = angular.module('starter.controllers');

  function AtividadeController($scope, $rootScope, $stateParams, $state, AtividadeService) {

   	$scope.init	 = function(){

      if(!$stateParams.atividadeId){
        $state.go("app");
        return;
      } 
      
      //fazer busca da atividade pelo id
      $scope.atividade = {_id:$stateParams.atividadeId};

   	};


  }

  AtividadeController.$inject = ["$scope","$rootScope", "$stateParams", "$state", "AtividadeService"];

  module.exports = controllers.controller("AtividadeController", AtividadeController);
})();
