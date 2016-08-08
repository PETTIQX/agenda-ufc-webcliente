(function() {

  'use strict';

  var controllers = angular.module('starter.controllers');

<<<<<<< HEAD
  function AppController($scope, $rootScope, AtividadeService) {
=======
  function AppController($scope,$http, xauth) {

>>>>>>> master

   	$scope.init	 = function(){

   		$scope.atividades = [];      	

   		AtividadeService.buscaEventos().then(
	   		function(response){
	   			console.log(response.data);
	   			$scope.atividades = response.data;
	   		},
	   		function(error){
	   			console.log(error.data);
	   		}
   		)	

   	};

<<<<<<< HEAD

  }

  AppController.$inject = ["$scope","$rootScope", "AtividadeService"];
=======
    

  }

  controllers.value('xauth','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpbiI6Ij\
  AzNTM1MDIxIiwiX2lkIjoiNTc4ZTM3MDVhOTYzNDZjMjU3NDQ5NWQwIiwiZWRpdG9yIjp0cnVlLCJ2aW5jdWxhY2FvIjowfQ.SEYK5_QGiCRKFCYiaJMtEmTZnYIXLNmkf0xQ4VfE33o');


  AppController.$inject = ["$scope","$rootScope"];
>>>>>>> master

  module.exports = controllers.controller("AppController", ['$scope','$http','xauth',AppController]);
})();
