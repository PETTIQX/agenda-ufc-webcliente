(function() {

  'use strict';

  var controllers = angular.module('starter.controllers');

  function AtividadeController($scope, $rootScope, $stateParams, $state, $location,
     AtividadeService, LocalService, config, flowFactory) {


   	$scope.init	 = function(){

      $scope.serviceAddress = config.serviceAddress;
      $scope.imageAddress = config.imageAddress;
      $scope.imagemUploadAdress = config.imagemUploadAdress;

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
        if($stateParams.action == 'editar'){
          $location.path("app");
        }
        else if($stateParams.action == 'cadastrar'){
          $location.path("cadastro-atividade-agendamento/" + $scope.atividade._id + "/agendarAtividade");
        }
      }

      $scope.uploadCompleto = function()
      {
        alert("Upload de imagens completo!");
      }

      $scope.removerHorario = removerHorario;
      function removerHorario(atividade, index){
        atividade.horarios.splice(index, 1);
        atualizarAtividade(atividade);
      }

      $scope.atualizarHorario = atualizarHorario;
      function atualizarHorario(atividade, horario){

        if(horario.data){
          var vetorData = horario.data.split('/');
        }
        //Se não é evento semanal...
        if(horario.frequencia != 2){
          var date = new Date();
          horario.diaDaSemana = date.getDay();
        }

        if(horario.frequencia == 0){

          var novoHorario = {
              hora : horario.hora,
              dia : vetorData[0],
              mes : vetorData[1],
              ano : vetorData[2],
              frequencia : horario.frequencia,
              diaDaSemana : horario.diaDaSemana
          };

          atividade.horarios.push(novoHorario);
          atualizarAtividade(atividade);
        }

        else if(horario.frequencia == 1){
          var novoHorario = {
              hora : horario.hora,
              dia : vetorData[0],
              mes : vetorData[1],
              ano : vetorData[2],
              frequencia : horario.frequencia,
              excluirFds : horario.excluirFds,
              diaDaSemana : horario.diaDaSemana
          };

          atividade.horarios.push(novoHorario);
          atualizarAtividade(atividade);
        }

        else if(horario.frequencia == 2){
          var novoHorario = {
              hora : horario.hora,
              dia : 0,
              mes : 0,
              ano : 0,
              frequencia : horario.frequencia,
              diaDaSemana : horario.diaDaSemana
          };

          atividade.horarios.push(novoHorario);
          atualizarAtividade(atividade);
        }

        else if(horario.frequencia == 3){
          var novoHorario = {
              hora : horario.hora,
              dia : vetorData[0],
              mes : vetorData[1],
              ano : vetorData[2],
              frequencia : horario.frequencia,
              diaDaSemana : horario.diaDaSemana
          };

          atividade.horarios.push(novoHorario);
          atualizarAtividade(atividade);
        }

        $scope.horario = {};
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
              $location.path("/cadastro-imagem-atividade/" + idAtividade + "/cadastrar");

          },
          function(error){
            alert("Erro: " + error.data);
            console.log(error)
          });
          return;
      };

      $scope.atualizarAtividade = atualizarAtividade;

      function atualizarAtividade(atividade){
        
        var splitTags = atividade.tags.split(" ");
        atividade.tags = splitTags;

        AtividadeService.atualizarAtividade(atividade, $rootScope.token).then(
          function(response){
            console.log("Atividade atualizada com sucesso");
            $location.path("/detalhes-atividade/" + atividade._id);
          },
          function(error){
            console.log("Erro ao atualizar...");
          });
          return;
      }

      $scope.removerAtividade = function(atividadeId){

         AtividadeService.removerAtividade(atividadeId, $rootScope.token).then(
           function(response){
             console.log(response.data);
             $state.reload();
           },
           function(erro){
             console.log(erro.data);
           });
         return;
       }

       $scope.removerImagem = function(nomeImagem){
         AtividadeService.removerImagem($scope.atividade._id, $rootScope.token, nomeImagem)
          .then(function(response){
              console.log("Imagem removida com sucesso");
              carregarAtividades();
          },
          function(err){
          console.log(err);
        });
       }

       function carregarAtividades(){
        AtividadeService.buscarAtividadePorId($stateParams.atividadeId).then(
           function(response){
             console.log(response.data);
             $scope.atividade = response.data[0];
           },
           function(error){
             console.log(error.data);
           });
       }

      $scope.carregarAtividades = carregarAtividades;

      if($stateParams.editarAtividade){
        
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
        

        function arrayToStr(array){
          var result = "";
          for(var i in array){
            result += (array[i] + " ");
          }
          return result;
        }

        $scope.atividade = undefined;
        AtividadeService.buscarAtividadePorId($stateParams.atividadeId).then(
           function(response){
              $scope.atividade = response.data[0];
              $scope.atividade.tags = arrayToStr(response.data[0].tags);
           },
           function(error){
             console.log(error.data);
          }
        );
        return;
      }

      else if($stateParams.minhasAtividades){
        $scope.atividades = [];
        AtividadeService.buscarAtividadePorUsuario($rootScope.token).then(
          function(response){
            console.log(response.data);
            $scope.atividades = response.data;
          },
          function(error){
            console.log(error.data);
          });
        return;
      }

      else if($stateParams.cadastrarAtividade){
        $scope.locais = [];
        LocalService.buscarLocais().then(
          function(response){
            console.log(response.data);
            $scope.locais = response.data;
          },
          function(error){
            console.log(error.data);
          });
        return;
      }

      else if($stateParams.agendarAtividade){
        $scope.horarioFrequencia = ["Pontual", "Diário", "Semana", "Mensal"];
        AtividadeService.buscarAtividadePorId($stateParams.atividadeId).then(
          function(response){
            $scope.atividade = response.data[0];
          },
          function(error){
            console.log(error.data);
          });
          return;
      }

      else if($stateParams.atividadeId){
        $scope.horarioFrequencia = ["Pontual", "Diário", "Semanal", "Mensal"];
        $scope.diasDaSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
        carregarAtividades();
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
