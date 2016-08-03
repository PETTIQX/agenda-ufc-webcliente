(function() {

    'use strict';

    var services = angular.module("starter.services");

    function LocalService($http, $q, config, routes, AppTollkit) {

        var PRIVATE_LOCAL = AppTollkit.serviceAddress(routes.PRIVATE_LOCAL);
        var BUSCA_LOCAIS = AppTollkit.serviceAddress(routes.BUSCA_LOCAIS);
        
        LocalService.buscarLocais = listarLocais;

        function buscarLocais() {
            
            var params = {
                query:{}
            };

            return $http.post(BUSCA_LOCAIS, params);

        }

        LocalService.cadastrarLocal = cadastrarLocal;

        function cadastrarLocal(local) {
            
            var params = {
                local : {
                    nome : local.nome,
                    descricao : local.descricao
                }
            };

            return $http.post(PRIVATE_LOCAL, params);

        }

        LocalService.removerLocal = removerLocal;

        function removerLocal(idLocal) {

            var params = {
                idLocal : idLocal
            };

            return $http.delete(PRIVATE_LOCAL, params);

        }
        
        LocalService.atualizarLocal = atualizarLocal;

        function atualizarLocal(local) {
            
            var params = {
                local : {
                    _id : local._id,
                    nome : local.nome,
                    descricao : local.descricao
                }
            };

            return $http.put(PRIVATE_LOCAL, params);

        }

        return LocalService;
    }

    module.exports = services.service("LocalService", LocalService);

    LocalService.$inject = ["$http", "$q", "config", "routes", "AppTollkit"];


})();
