( function(){

  'use strict';

  var constants = angular.module('starter.constants');

  function getRoutes(){

    var routes =
      {
          BUSCA_ATIVIDADES: "/api/public/atividade/busca",
          BUSCA_ATIVIDADES_PRIVADA: "/api/private/atividade/busca",
          PRIVATE_ATIVIDADE: "/api/private/atividade",
          LOGIN: "/api/public/usuario/login",
          BUSCA_LOCAIS: "/api/public/local/busca",
          PRIVATE_LOCAL: "/api/private/local",
          CADASTRO: "/api/public/usuario",
          UPLOAD_IMAGEM: "/api/private/atividade/image",
          DEL_IMAGEM: "/api/private/atividade/image"
      };
    return routes;
  }

  module.exports = constants.constant('routes', getRoutes());

})();
