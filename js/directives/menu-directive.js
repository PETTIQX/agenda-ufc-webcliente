(function() {
  'use strict';

  var directives = angular.module('starter.directives');

  function MainApp() {
    return {
      restrict: 'A',
      scope: true,
      templateUrl: 'templates/directives/menu.html',
      controller: 'MainAppController'
    };
  }

  MainApp.$inject = [];

  module.exports = directives.directive('mainApp', MainApp);

})();