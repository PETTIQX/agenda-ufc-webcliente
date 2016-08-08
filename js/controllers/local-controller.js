(function() {

  'use strict';

  var controllers = angular.module('starter.controllers');

  function LocalController($scope, $rootScope, $stateParams, $state, LocalService) {

   	$scope.init	 = function(){

      $scope.cadastrarLocal = function(local){
        
        LocalService.cadastrarLocal(local, $rootScope.token).then(
          function(response){
            alert("Cadastro realizado com sucesso!");
          },
          function(error){
            alert("Erro ao cadastrar");
          }
        )

      };
   	};

    $scope.removerLocal = function(idLocal){

      LocalService.removerLocal(idLocal, $rootScope.token).then(
          function(response){
            console.log(response.data);
          },
          function(error){
            console.log(error.data);
          }
        );

    };

    $scope.editarLocal = function(local){

      LocalService.editarLocal(local, $rootScope.token).then(
          function(response){
            console.log(response.data);
          },
          function(error){
            console.log(error.data);
          }
        );

    }; 


  }

  LocalController.$inject = ["$scope","$rootScope", "$stateParams", "$state", "LocalService"];

  module.exports = controllers.controller("LocalController", LocalController);
})();
