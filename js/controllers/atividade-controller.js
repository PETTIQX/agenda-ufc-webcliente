(function() {

  'use strict';

  var controllers = angular.module('starter.controllers');

  function AtividadeController($scope, $rootScope, $stateParams, $state, AtividadeService) {

   	$scope.init	 = function(){

      if($stateParams.atividadeId){
        $scope.atividade = {_id:$stateParams.atividadeId};

        AtividadeService.buscarAtividadePorId($stateParams.atividadeId).then(
          function(response){
            console.log(response.data);
            $scope.atividade = response.data[0];	
          },
          function(error){
            console.log(error.data);
          }
        );
      
      }

      else if($stateParams.userToken){

        AtividadeService.buscarAtividadePorUsuario($stateParams.userToken).then(
          function(response){
            console.log(response.data);
            $scope.atividades = response.data;	
          },
          function(error){
            console.log(error.data);
          }
        );

      }

      else{
        $state.go("app");
        return;
      } 
      

   	};


  }

  AtividadeController.$inject = ["$scope","$rootScope", "$stateParams", "$state", "AtividadeService"];

  module.exports = controllers.controller("AtividadeController", AtividadeController);
})();
