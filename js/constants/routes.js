( function(){

  'use strict';

  var constants = angular.module('starter.constants');

  function getRoutes(){

    var routes =
      {
          BUSCA_EVENTOS: "/api/public/atividade/busca",
          LOGIN: "/api/public/usuario/login",
      };
    return routes;
  }

  module.exports = constants.constant('routes', getRoutes());

})();
