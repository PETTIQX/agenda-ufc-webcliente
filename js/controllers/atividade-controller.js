(function() {

  'use strict';

  var controllers = angular.module('starter.controllers');

  function AtividadeController($scope, $rootScope, $stateParams, $state, $location,
     AtividadeService, LocalService,config, flowFactory) {


   	$scope.init	 = function(){

      $scope.serviceAddress = config.serviceAddress;
      $scope.imageAddress = config.imageAddress;

      $scope.flowInstance = flowFactory.create({
          target: config.imageUploadAddress,
          query:{ 'idAtividade': $stateParams.atividadeId },
          headers:{ 'x-auth': $rootScope.token },
          permanentErrors: [404,401,400,204],
          testChunks:false
        });


       $scope.cardSelecionado = function(selecionado){
         console.log(selecionado);
        //  return selecionado ? 'card blue' : 'card';
       }

      $scope.uploadImagens = function()
      {
        $scope.flowInstance.upload();
        $('modal').openModal();
      }

      $scope.uploadCompleto = function()
      {
        alert("Upload de imagens completo!");
      }

      $scope.buscarAtividadesPorNome = function(atividadeNome){
        AtividadeService.buscarAtividades().then(
          function(response){
            for(var atividade in response.data){
              if(atividade.nome === atividadeNome){
                alert("Tem um igual...");
                return;
              }
            }
            alert("Não encontrado...");
          },
          function(erro){

          }
        );
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

      if($stateParams.minhasAtividades){
        $scope.atividades = [];
        AtividadeService.buscarAtividadePorUsuario($rootScope.token).then(
          function(response){
            console.log(response.data);
            $scope.atividades = response.data;

            if(!$scope.atividades.lenght){
              setTimeout(function(){
                $('#semAtividadesModal').openModal();
                $('.modal-trigger').leanModal();
              });
            }

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
        var splitTags = atividade.tags.split(" ");
        atividade.tags = splitTags;

        AtividadeService.cadastrarAtividade(atividade,$rootScope.token).then(
          function(response){
              console.log(response.data);
              alert('Atividade Cadastrada');
              var idAtividade = response.data._id;
              $location.path("/cadastro-imagem-atividade/" + idAtividade);

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

  AtividadeController.$inject = ["$scope","$rootScope", "$stateParams", "$state",
  "$location", "AtividadeService", "LocalService", "config", "flowFactory"];

  module.exports = controllers.controller("AtividadeController", AtividadeController);
})();
