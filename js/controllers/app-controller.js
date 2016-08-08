(function() {

  'use strict';

  var controllers = angular.module('starter.controllers');

  function AppController($scope,$http, xauth) {


   	$scope.init = function(){

   		console.log("init running");

   	};

    

  }

  controllers.value('xauth','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpbiI6Ij\
  AzNTM1MDIxIiwiX2lkIjoiNTc4ZTM3MDVhOTYzNDZjMjU3NDQ5NWQwIiwiZWRpdG9yIjp0cnVlLCJ2aW5jdWxhY2FvIjowfQ.SEYK5_QGiCRKFCYiaJMtEmTZnYIXLNmkf0xQ4VfE33o');


  AppController.$inject = ["$scope","$rootScope"];

  module.exports = controllers.controller("AppController", ['$scope','$http','xauth',AppController]);
})();
