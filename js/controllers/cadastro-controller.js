(function(){
    'use strict';

    var controllers = angular.module('starter.controllers');

    function CadastroController($scope, $rootScope, $stateParams, $state,$location, CadastroService) {

        $scope.init = function(){

            $scope.cadastro = function(nome,usuario,email,telefone,senha,vinculacao,editor){
                CadastroService.cadastro(nome,usuario,email,telefone,senha,vinculacao,editor).then(
                    function(response){
                        console.log(response.data);
                        $location.path("/login");
                        $location.replace();
                        alert("Usuário cadastrado");
                    },
                    function(error){
                        console.log(error.data);
                        alert("Erro ao efetuar cadastro.");
                    }
                )
            };

        };

    }

    CadastroController.$inject  = ["$scope", "$rootScope", "$stateParams", "$state","$location","CadastroService"];

    module.exports = controllers.controller("CadastroController", CadastroController);

})();
