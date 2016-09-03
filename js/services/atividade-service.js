(function() {

    'use strict';

    var services = angular.module("starter.services");

    function AtividadeService($http, $q, config, routes, $location, AppTollkit) {

        var BUSCA_ATIVIDADES = AppTollkit.serviceAddress(routes.BUSCA_ATIVIDADES);
        var BUSCA_ATIVIDADES_PRIVADA = AppTollkit.serviceAddress(routes.BUSCA_ATIVIDADES_PRIVADA);
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

        AtividadeService.buscarAtividadePorUsuario = buscarAtividadePorUsuario;

        function buscarAtividadePorUsuario(userToken){
            var req = {
                method : "POST",
                url : BUSCA_ATIVIDADES_PRIVADA,
                headers : {
                    "X-Auth" : userToken
                },
                data : {
                    query : {}
                }
            };
            return $http(req);
        }

        AtividadeService.cadastrarAtividade = cadastrarAtividade;

        function cadastrarAtividade(atividade, userToken) {

            var params = {
                atividade : {
                    nome: atividade.nome,
                    descricao : atividade.descricao,
                    categoria : atividade.categoria,
                    horarios : [],
                    local : atividade.local,
                    tags : atividade.tags,
                    site : atividade.site,
                    imagens : []
                }
            };

            console.log(params);

            var req = {
                method : "POST",
                url : PRIVATE_ATIVIDADE,
                headers : {
                    "X-Auth" : userToken
                },
                data : params
            };
            return $http(req);

        }

        AtividadeService.removerAtividade = removerAtividade;

        function removerAtividade(idAtividade, userToken) {

            var req = {
                method : "DELETE",
                url : PRIVATE_ATIVIDADE,
                headers : {
                    "X-Auth" : userToken,
                    "Content-Type" : "application/json;charset=utf-8"
                },
                data : {
                    idAtividade : idAtividade
                }
            };

            return $http(req);

        }

        AtividadeService.atualizarAtividade = atualizarAtividade;

        function atualizarAtividade(atividade, userToken) {

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

            var req = {
                method : "PUT",
                url : PRIVATE_ATIVIDADE,
                headers : {
                    "X-Auth" : userToken
                },
                data : params
            };
            return $http(req);

        }

        


        return AtividadeService;
    }

    module.exports = services.service("AtividadeService", AtividadeService);

    AtividadeService.$inject = ["$http", "$q", "config", "routes","$location", "AppTollkit"];


})();
