(function() {

    'use strict';

    var services = angular.module("starter.services");

    function LocalService($http, $q, config, routes, AppTollkit) {

        var PRIVATE_LOCAL = AppTollkit.serviceAddress(routes.PRIVATE_LOCAL);
        var BUSCA_LOCAIS = AppTollkit.serviceAddress(routes.BUSCA_LOCAIS);
        
        var LocalService = {};

        LocalService.buscarLocais = buscarLocais;

        function buscarLocais() {
            
            var params = {
                query:{}
            };

            return $http.post(BUSCA_LOCAIS, params);

        }

        LocalService.cadastrarLocal = cadastrarLocal;

        function cadastrarLocal(local, userToken) {
            
            var req = {
                method : "POST",
                url : PRIVATE_LOCAL,
                headers : {
                    "X-Auth" : userToken
                },
                data : {
                    local : local
                }
            };
            
            return $http(req);

        }

        LocalService.removerLocal = removerLocal;

        function removerLocal(idLocal, userToken) {

            var params = {
                idLocal : idLocal
            };

            var req = {
                method : "DELETE",
                url : PRIVATE_LOCAL,
                headers : {
                    "X-Auth" : userToken
                },
                data : params
            };
            return $http(req);

        }
        
        LocalService.editarLocal = editarLocal;

        function editarLocal(local, userToken) {
            
            var params = {
                local : {
                    _id : local._id,
                    nome : local.nome,
                    descricao : local.descricao
                }
            };

            var req = {
                method : "PUT",
                url : PRIVATE_LOCAL,
                headers : {
                    "X-Auth" : userToken
                },
                data : params
            };
            return $http(req);

        }

        return LocalService;
    }

    module.exports = services.service("LocalService", LocalService);

    LocalService.$inject = ["$http", "$q", "config", "routes", "AppTollkit"];


})();
