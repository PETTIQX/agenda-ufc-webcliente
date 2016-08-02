(function() {

    'use strict';

    var services = angular.module("starter.services");

    function AtividadeService($http, $q, config, routes, AppTollkit) {

        var BUSCA_EVENTOS = AppTollkit.serviceAddress(routes.BUSCA_EVENTOS);

        var AtividadeService = {};
        //AtividadeService.getPropostas = getPropostas;
        AtividadeService.buscaEventos = buscaEventos;
        
        function buscaEventos() {
            
            var params = {
                query:{}
            };  
            
            return $http.post(BUSCA_EVENTOS, params);
        }

        AtividadeService.buscaEventoPorId = buscaEventoPorId;

        function buscaEventoPorId(id) {
            var params = {
                query:{
                    _id : id
                }
            };
            return $http.post(BUSCA_EVENTOS, params);
        }
        
        return AtividadeService;
    }

    module.exports = services.service("AtividadeService", AtividadeService);

    AtividadeService.$inject = ["$http", "$q", "config", "routes", "AppTollkit"];


})();
