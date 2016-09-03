(function() {

  'use strict';

  var controllers = angular.module('starter.controllers');

  function AtividadeController($scope, $rootScope, $stateParams, $state, AtividadeService, LocalService) {


   	$scope.init	 = function(){

       $scope.cardSelecionado = function(selecionado){
         console.log(selecionado);
        //  return selecionado ? 'card blue' : 'card';
       }

       $scope.removerAtividade = function(atividadeId){

         AtividadeService.removerAtividade(atividadeId, $rootScope.token).then(
           function(response){
             console.log(response.data);
             $state.reload();
           },
           function(erro){
             console.log(erro.data);
           }
         )

       }

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

            if(!$scope.atividades.lenght){
              setTimeout(function(){
                $('#semAtividadesModal').openModal();
              });
            }

            //RAUL: Hack feio pra carregar os modais
            setTimeout(function(){
              $('.modal-trigger').leanModal();
            });

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
        AtividadeService.cadastrarAtividade(atividade,$rootScope.token).then(
          function(response){
              console.log(response.data);
              alert('Atividade Cadastrada');
          },
          function(error){
            alert("Erro: " + error.data);
            console.log(error)
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

            $('.chips').material_chip();
            $('.chips-initial').material_chip();
            $('.chips-placeholder').material_chip({
              placeholder: 'Digite uma tag',
              secondaryPlaceholder: '+Tag',
            });

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
