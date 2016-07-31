(function() {

  'use strict';

  var services = angular.module('starter.services');

  function AppTollkit(config) {

        var AppTollkit =  {

            servicesBaseAddress: config.serverAddress,
            //servicesBaseAddress: config.serverAddressLocal,

            /**
             * Copia todos atributos (inclusive funções), de um objeto para um novo objeto.
            *
            * @param {Object} object o objeto fonte da copia
            *
            * @return {Objeto} novo objeto com atributos e funções de object
            */
            clone: function(object) {
                var newObject = {};
                for (var property in object) {
                    newObject[property] = object[property];
                }
                return newObject;
            },

            /**
             * Copia todos atributos (inclusive funções), de um objeto para um outro objeto.
            *
            * @param {Object} from o objeto fonte da copia
            * @param {Object} to o objeto destino da copia
            */
            copy: function(from, to) {
                for (var property in from) {
                to[property] = from[property];
                }
            },

            /* *
            * Essa função prepara a URL para as requisições ao WebService(ws)
            *
            * @param {String} servicePath consulta ao serviço. Funciona como um sufixo que é concatenado com a base da URL (http://endereco:porta/)
            *
            * @return {String} uma URL completa para requistar o WebService (URL base + servicePath)
            * */
            serviceAddress: function (servicePath) {
                if (servicePath.charAt(0) == "/") {
                    servicePath = servicePath.substring(1);
                }
                return this.servicesBaseAddress + servicePath;
            }

        };

        return AppTollkit;

    }

    module.exports = services.service('AppTollkit', AppTollkit);

    AppTollkit.$inject = ['config'];

})();
