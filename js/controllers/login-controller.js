(function(){

    'use strict';

    var controllers = angular.module('starter.controllers');

    function LoginController($scope, $rootScope, $stateParams, $state, LoginService, jwtHelper) {
        
        $scope.init = function(){
            
            $scope.login = function(usuario, senha){
                LoginService.login(usuario, senha).then(
                    function(response){
                        console.log(response.data);
                        if(response.data.token){
                            localStorage.token = response.data.token;
                            $rootScope.user = jwtHelper.decodeToken(response.data.token);
                            $rootScope.auth = true;
                            localStorage.user = $rootScope.user;
                        }

                        //alert("Deu certo!");
                        //mudar para página inicial
                        $state.go('app');
                    },
                    function(error){
                        console.log(error.data);
                        alert("Deu erro!");
                    }
                )
            };

        };

    }

    LoginController.$inject  = ["$scope", "$rootScope", "$stateParams", "$state", "LoginService","jwtHelper" ];

    module.exports = controllers.controller("LoginController", LoginController);

})();
