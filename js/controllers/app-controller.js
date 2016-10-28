(function() {

  'use strict';

  var controllers = angular.module('starter.controllers');

  function AppController($scope, $rootScope, AtividadeService, config) {

   	$scope.init	 = function(){

      $scope.imageAddress = config.imageAddress;
   		$scope.atividadesDia = [];
      $scope.atividadesSemana = [];
      $scope.atividadesMes = [];
      

      var date = new Date();
      var ultimoDiaDoMes = new Date(date.getFullYear(), date.getMonth() + 1, 0); //Pega o último dia do mês

      //Dia
      var queryDia = {
        tipo : 1,
        dia : date.getUTCDate(),
        mes : date.getUTCMonth() + 1,
        ano : date.getUTCFullYear(),
        diaDaSemana : date.getDay(),
        fimDeSemana : date.getDay() === 0 || date.getDay() === 6 
      };
      
      AtividadeService.buscarAtividadesAvancada(queryDia).then(
	   		function(response){
	   			console.log(response.data);
          $scope.atividadesDia = response.data;
	   		},
	   		function(error){
	   			console.log(error.data);
	   		}
   		);
  
      //Semana
      var querySemana = {
        tipo : 2,
        dia : date.getUTCDate(),
        mes : date.getUTCMonth() + 1,
        ano : date.getUTCFullYear(),
        diaDaSemana : date.getDay(),
        fimDeSemana : date.getDay() === 0 || date.getDay() === 6,
        diaFinal : ultimoDiaDoMes.getUTCDate(), 
        mesFinal : date.getUTCMonth() + 1,
        anoFinal : date.getUTCFullYear(),
        diaDaSemanaRange1 : 0, //- Começo do período de busca
        diaDaSemanaRange1Final : 6, //- Final do período de busca
        diaDaSemanaRange2 : 0, //- Começo do período de busca
        diaDaSemanaRange2Final : 6//- Final do período de busca
      };

      if(querySemana.diaFinal - querySemana.dia < 6){
        if(querySemana.diaDaSemana > ultimoDiaDoMes.getDay()){
          querySemana.diaDaSemanaRange1 = querySemana.diaDaSemana;
          querySemana.diaDaSemanaRange2Final = ultimoDiaDoMes.getDay();
        }
        else{
          querySemana.diaDaSemanaRange1 = querySemana.diaDaSemana;
          querySemana.diaDaSemanaRange1Final = ultimoDiaDoMes.getDay();
          querySemana.diaDaSemanaRange2 = querySemana.diaDaSemana;
          querySemana.diaDaSemanaRange2Final = ultimoDiaDoMes.getDay();
        }
      }

      console.log(querySemana);

      AtividadeService.buscarAtividadesAvancada(querySemana).then(
        function(response){
          console.log(response.data);
          $scope.atividadesSemana = response.data;
        },
        function(error){
          console.log(error.data);
        }
      );

      //Mês
      var queryMes = {
        tipo : 3,
        dia : date.getUTCDate(),
        mes : date.getUTCMonth() + 1,
        ano : date.getUTCFullYear(),
        diaDaSemana : date.getDay(),
        fimDeSemana : date.getDay() === 0 || date.getDay() === 6,
        diaFinal : ultimoDiaDoMes.getUTCDate(), 
        mesFinal : date.getUTCMonth() + 1,
        anoFinal : date.getUTCFullYear(),
        diaDaSemanaRange1 : 0, //- Começo do período de busca
        diaDaSemanaRange1Final : 6, //- Final do período de busca
        diaDaSemanaRange2 : 0, //- Começo do período de busca
        diaDaSemanaRange2Final : 6//- Final do período de busca
      };

      if(queryMes.diaFinal - queryMes.dia < 6){
        if(queryMes.diaDaSemana > ultimoDiaDoMes.getDay()){
          queryMes.diaDaSemanaRange1 = queryMes.diaDaSemana;
          queryMes.diaDaSemanaRange2Final = ultimoDiaDoMes.getDay();
        }
        else{
          queryMes.diaDaSemanaRange1 = queryMes.diaDaSemana;
          queryMes.diaDaSemanaRange1Final = ultimoDiaDoMes.getDay();
          queryMes.diaDaSemanaRange2 = queryMes.diaDaSemana;
          queryMes.diaDaSemanaRange2Final = ultimoDiaDoMes.getDay();
        }
      }

      console.log(queryMes);

      AtividadeService.buscarAtividadesAvancada(queryMes).then(
        function(response){
          console.log(response.data);
          $scope.atividadesMes = response.data;
        },
        function(error){
          console.log(error.data);
        }
      );

   	};

  }

  AppController.$inject = ["$scope","$rootScope", "AtividadeService", "config"];

  module.exports = controllers.controller("AppController", AppController);
})();
