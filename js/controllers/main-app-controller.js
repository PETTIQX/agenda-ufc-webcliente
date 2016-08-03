(function(){

    'use strict';

    // pegando dependência dos controladores do módulo e adicionando novo controlados ao módulo
    var controllers = angular.module('starter.controllers');

    function MainAppController($scope, $rootScope, $state) {

        
        $scope.logout = function(){
            $rootScope.user = undefined;
            $rootScope.auth = undefined;
            localStorage.user = undefined;
            localStorage.token = undefined;
            $state.go('app');
        }

    }

    MainAppController.$inject  = ["$scope","$rootScope","$state"];

    module.exports = controllers.controller("MainAppController", MainAppController);

})();
