(function() {

    'use strict';

    var services = angular.module("starter.services");

    function CadastroService($http, $q, config, routes, AppTollkit) {

        var CADASTRO = AppTollkit.serviceAddress(routes.CADASTRO);

        CadastroService.cadastro = cadastro;

        function cadastro(nome,usuario,email,telefone,senha,vinculacao,editor) {
            var params = {
                usuario:{
                    nome  : nome,
                    login : usuario,
                    senha : senha,
                    email : email,
                    telefone  : telefone,
                    vinculacao  : vinculacao,
                    editor  : editor
                }
            };

            return $http.post(CADASTRO, params);

        }

        return CadastroService;
    }

    module.exports = services.service("CadastroService", CadastroService);

    CadastroService.$inject = ["$http", "$q", "config", "routes", "AppTollkit"];


})();
