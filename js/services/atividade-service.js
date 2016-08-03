(function() {

    'use strict';

    var services = angular.module("starter.services");

    function AtividadeService($http, $q, config, routes, AppTollkit) {

        var BUSCA_ATIVIDADES = AppTollkit.serviceAddress(routes.BUSCA_ATIVIDADES);
        var PRIVATE_ATIVIDADE = AppTollkit.serviceAddress(routes.PRIVATE_ATIVIDADE);

        var AtividadeService = {};
        //AtividadeService.getPropostas = getPropostas;
        AtividadeService.buscarAtividades = buscarAtividades;
        
        function buscarAtividades() {
            
            var params = {
                query:{}
            };  
            
            return $http.post(BUSCA_ATIVIDADES, params);
        }

        AtividadeService.buscarAtividadePorId = buscarAtividadePorId;

        function buscarAtividadePorId(id) {
            var params = {
                query:{
                    _id : id
                }
            };
            return $http.post(BUSCA_ATIVIDADES, params);
        }
        
        AtividadeService.cadastrarAtividade = cadastrarAtividade;

        function cadastrarAtividade(atividade) {

            var params = {
                atividade : {
                    nome: atividade.nome,
                    descricao : atividade.descricao,
                    categoria : atividade.categoria,
                    horarios : atividade.horarios,
                    local : atividade.local,
                    tags : atividade.tags,
                    site : atividade.site,
                    imagens : atividade.imagens
                }
            };

            return $http.post(PRIVATE_ATIVIDADE, params);

        }

        AtividadeService.removerAtividade = removerAtividade;

        function removerAtividade(idAtividade) {

            var params = {
                idAtividade : idAtividade
            };

            return $http.delete(PRIVATE_ATIVIDADE, params);

        }

        AtividadeService.atualizarAtividade = atualizarAtividade;

        function atualizarAtividade(atividade) {

            var params = {
                atividade : {
                    _id : atividade._id,
                    nome: atividade.nome,
                    descricao : atividade.descricao,
                    categoria : atividade.categoria,
                    horarios : atividade.horarios,
                    local : atividade.local,
                    tags : atividade.tags,
                    site : atividade.site,
                    imagens : atividade.imagens
                }
            };

            return $http.put(PRIVATE_ATIVIDADE, params);

        }


        return AtividadeService;
    }

    module.exports = services.service("AtividadeService", AtividadeService);

    AtividadeService.$inject = ["$http", "$q", "config", "routes", "AppTollkit"];


})();
