(function() {

    'use strict';

    var services = angular.module("starter.services");

    function AtividadeService($http, $q, config, routes, $location, AppTollkit) {

        var BUSCA_ATIVIDADES = AppTollkit.serviceAddress(routes.BUSCA_ATIVIDADES);
        var BUSCA_ATIVIDADES_PRIVADA = AppTollkit.serviceAddress(routes.BUSCA_ATIVIDADES_PRIVADA);
        var BUSCA_ATIVIDADES_AVANCADA = AppTollkit.serviceAddress(routes.BUSCA_ATIVIDADES_AVANCADA);
        var PRIVATE_ATIVIDADE = AppTollkit.serviceAddress(routes.PRIVATE_ATIVIDADE);
        var UPLOAD_IMAGEM = AppTollkit.serviceAddress(routes.UPLOAD_IMAGEM);
        var DEL_IMAGEM  = AppTollkit.serviceAddress(routes.DEL_IMAGEM);

        var AtividadeService = {};
        AtividadeService.buscarAtividades = buscarAtividades;

        function buscarAtividades() {

            var params = {
                query:{}
            };

            return $http.post(BUSCA_ATIVIDADES, params);
        }

        AtividadeService.buscarAtividadesAvancada = buscarAtividadesAvancada;

        function buscarAtividadesAvancada(query) {

            var params = {
                query:query
            };

            return $http.post(BUSCA_ATIVIDADES_AVANCADA, params);
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
                    imagens : atividade.imagens,
                    imagemPrincipal: atividade.imagemPrincipal
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

        function adicionarImagems(atividade, userToken, files){
            var params = {
                file : files,
                idAtividade : atividade._id
            };

            var req = {
                method : "POST",
                url : UPLOAD_IMAGEM,
                headers : {
                    "X-Auth" : userToken
                },
                data : params
            };
            return $http(req);
        }

        function removerImagem(atividadeId, userToken, nomeImagem){
          var params = {
            idAtividade: atividadeId,
            imagem: nomeImagem
          };

          var req = {
            method: "DELETE",
            url:  DEL_IMAGEM,
            headers: {
              "Content-Type" : "application/json;charset=utf-8",
              "X-Auth": userToken
            },
            data: params
          };
          return $http(req);
        }

        AtividadeService.removerImagem = removerImagem;

        return AtividadeService;
    }

    module.exports = services.service("AtividadeService", AtividadeService);

    AtividadeService.$inject = ["$http", "$q", "config", "routes","$location", "AppTollkit"];


})();
