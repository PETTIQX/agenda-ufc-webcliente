(function(){

    'use strict';

    // pegando dependência dos controladores do módulo e adicionando novo controlados ao módulo
    var controllers = angular.module('starter.controllers');

    function MainAppController($scope, $http) {

        

    }

    MainAppController.$inject  = ["$scope","$http"];

    module.exports = controllers.controller("MainAppController", MainAppController);

})();
