( function(){

  'use strict';

  var constants = angular.module('starter.constants');

  function getRoutes(){

    var routes =
      {
          BUSCA_ATIVIDADES: "/api/public/atividade/busca",
          PRIVATE_ATIVIDADE: "/api/private/atividade",
          LOGIN: "/api/public/usuario/login",
          BUSCA_LOCAIS: "/api/public/local/busca",
          PRIVATE_LOCAL: "/api/private/local"
      };
    return routes;
  }

  module.exports = constants.constant('routes', getRoutes());

})();
