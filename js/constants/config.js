( function(){

  'use strict';

  var constants = angular.module('starter.constants');

  function getConfig(){

    var config =
      {
        serverAddress: "http://ec2-52-38-136-232.us-west-2.compute.amazonaws.com:4000/",
        serverAddressLocal: "http://localhost:3000/",
        imageAddress: "http://ec2-52-38-136-232.us-west-2.compute.amazonaws.com:4000/public/image/",
        imageUploadAddress: "http://ec2-52-38-136-232.us-west-2.compute.amazonaws.com:4000/api/private/atividade/image"
        };
    return config;
  }

  module.exports = constants.constant('config', getConfig());

})();
