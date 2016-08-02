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

      AtividadeService.buscaEventoPorId($stateParams.atividadeId).then(
        function(response){
	   			console.log(response.data);
	   	    $scope.atividade = response.data[0];	
      },
	   		function(error){
	   			console.log(error.data);
	   		}
      )

   	};


  }

  AtividadeController.$inject = ["$scope","$rootScope", "$stateParams", "$state", "AtividadeService"];

  module.exports = controllers.controller("AtividadeController", AtividadeController);
})();
