(function(){

    'use strict';

    var controllers = angular.module('starter.controllers');

    function LoginController($scope, $rootScope, $stateParams, $state,$location, LoginService) {

        $scope.init = function(){

            $scope.login = function(usuario, senha){
                LoginService.login(usuario, senha).then(
                    function(response){
                        localStorage.setItem('token',response.data.token);
                        localStorage.setItem('usuario',usuario);
                        $rootScope.usuario = usuario;
                        $location.path("/");
                        $location.replace();
                    },
                    function(error){
                        console.log(error.data);
                        alert("Deu erro!");
                    }
                )
            };


            $scope.logout = function()
            {
              localStorage.removeItem('token');
              localStorage.removeItem('usuario');
              $rootScope.usuario = undefined;
              alert("Deslogado!");
            };
        };

    }

    LoginController.$inject  = ["$scope", "$rootScope", "$stateParams", "$state","$location","LoginService"];

    module.exports = controllers.controller("LoginController", LoginController);

})();
