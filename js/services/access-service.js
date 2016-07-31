(function() {

    'use strict';

    var services = angular.module('starter.services');

    function Access($q,$rootScope) {

        var Access = {};

        Access.OK =  200;
        Access.UNAUTHORIZED = 401;
        Access.FORBIDDEN= 403;

        Access.isAnonymous = function(){
            if($rootScope.token){
                return $q.reject(Access.OK);
            }else{
                return Access.OK;
            }
        };


        Access.isAuthenticated = function(){
            if($rootScope.token){
                return Access.OK;
            }else{
                return $q.reject(Access.UNAUTHORIZED);
            }
        };

        Access.isOtherwise = function(){
          return $q.reject(Access.FORBIDDEN);
        };

        Access.isPublic = function(){
          return Access.OK;
        };

        return Access;

    }


    module.exports = services.service("Access", Access);
    Access.$inject = ["$q","$rootScope"];


})();
