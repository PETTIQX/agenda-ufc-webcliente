(function() {

  'use strict';

  var controllers = angular.module('starter.controllers');

  function AppController($scope, $rootScope, AtividadeService, config) {

   	$scope.init	 = function(){

      $scope.imageAddress = config.imageAddress;
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

  AppController.$inject = ["$scope","$rootScope", "AtividadeService", "config"];

  module.exports = controllers.controller("AppController", AppController);
})();
