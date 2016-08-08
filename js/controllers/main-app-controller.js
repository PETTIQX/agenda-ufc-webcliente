(function(){

    'use strict';

    // pegando dependência dos controladores do módulo e adicionando novo controlados ao módulo
    var controllers = angular.module('starter.controllers');

    function MainAppController($scope, $http,$rootScope) {

      //FIXME coloquei aqui para poder ser chamado pelo menu, mas é aqui mesmo que deveria ficar?
      $scope.logout = function()
      {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        $rootScope.usuario = undefined;
        alert("Deslogado!");
      };

    }

    MainAppController.$inject  = ["$scope","$http","$rootScope"];

    module.exports = controllers.controller("MainAppController", MainAppController);

})();
