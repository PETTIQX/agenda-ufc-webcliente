(function() {

  'use strict';

  var controllers = angular.module('starter.controllers');

  function AppController($scope, $rootScope, AtividadeService) {

   	$scope.init	 = function(){

   		$scope.atividades = []; 

   		AtividadeService.buscarAtividades().then(
	   		function(response){
	   			console.log(response.data);
	   			$scope.atividades = response.data;
	   		},
	   		function(error){
	   			console.log(error.data);
	   		}
   		)	

   	};


  }

  AppController.$inject = ["$scope","$rootScope", "AtividadeService"];

  module.exports = controllers.controller("AppController", AppController);
})();
