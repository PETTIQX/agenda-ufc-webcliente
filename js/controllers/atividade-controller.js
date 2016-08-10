(function() {

  'use strict';

  var controllers = angular.module('starter.controllers');

  function AtividadeController($scope, $rootScope, $stateParams, $state, AtividadeService, LocalService) {

   	$scope.init	 = function()
    {

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
        return;
      }

      if($stateParams.minhasAtividades && $rootScope.token){
        $scope.atividades = [];
        AtividadeService.buscarAtividadePorUsuario($rootScope.token).then(
          function(response){
            console.log(response.data);
            $scope.atividades = response.data;
          },
          function(error){
            console.log(error.data);
          }
        );
        return;
      }

      $scope.cadastrarAtividade = cadastrarAtividade;

      function cadastrarAtividade(atividade){
        console.log(atividade);
        AtividadeService.cadastrarAtividade(atividade).then(
          function(response){
              console.log(response.data);
              alert('Atividade Cadastrada');
          },
          function(error){
            alert("Erro: " + error.data);
          });
      };

      if($stateParams.cadastrarAtividade){
        $scope.locais = [];
        LocalService.buscarLocais().then(
          function(response){
            console.log(response.data);
            $scope.locais = response.data;

            //JORDY: Hack feio pra fazer os selects carregarem as opções
            setTimeout(function(){
              $('select').material_select();
            },200);

          },
          function(error){
            console.log(error.data);
          }
        );
        return;
      }

      else{
        $state.go("app");
        return;
      }



   	};


  }

  AtividadeController.$inject = ["$scope","$rootScope", "$stateParams", "$state", "AtividadeService", "LocalService"];

  module.exports = controllers.controller("AtividadeController", AtividadeController);
})();
