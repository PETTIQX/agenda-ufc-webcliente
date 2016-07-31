(function() {
  'use strict';

  var directives = angular.module('starter.directives');

  function FooterApp() {
    return {
      restrict: 'A',
      scope: true,
      templateUrl: 'templates/directives/footer.html',
      controller: 'MainAppController'
    };
  }

  FooterApp.$inject = [];

  module.exports = directives.directive('footerApp', FooterApp);

})();