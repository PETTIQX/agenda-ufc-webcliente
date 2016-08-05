(function() {

    'use strict';

    var services = angular.module("starter.services");

    function LoginService($http, $q, config, routes, AppTollkit) {

        var LOGIN = AppTollkit.serviceAddress(routes.LOGIN);
        
        var LoginService = {};

        LoginService.login = login;

        function login(usuario, senha) {
            var params = {
                usuario:{
                    login : usuario,
                    senha : senha
                }
            };

            return $http.post(LOGIN, params);

        }

        return LoginService;
    }

    module.exports = services.service("LoginService", LoginService);

    LoginService.$inject = ["$http", "$q", "config", "routes", "AppTollkit"];


})();
