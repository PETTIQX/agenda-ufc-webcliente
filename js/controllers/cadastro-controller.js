(function(){
    'use strict';

    var controllers = angular.module('starter.controllers');

    function CadastroController($scope, $rootScope, $stateParams, $state, $location, CadastroService) {

        $scope.init = function(){

            $scope.cadastro = function(usuario, vinculacao, editor){
                CadastroService.cadastro(usuario.nome, usuario.id, usuario.email, usuario.telefone, usuario.senha, vinculacao, editor).then(
                    function(response){
                        console.log(response.data);
                        $location.path("/login");
                        $location.replace();
                    },
                    function(error){
                        console.log(error.data);
                        $('#erroCadastroModal').openModal();
                    }
                )
            };

        };

    }

    CadastroController.$inject  = ["$scope", "$rootScope", "$stateParams", "$state","$location","CadastroService"];

    module.exports = controllers.controller("CadastroController", CadastroController);

})();
