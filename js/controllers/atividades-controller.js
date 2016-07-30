(function(){

    'use strict';

    var atividades = angular.module('starter.atividades');

    function ListAll($scope, $http) {

        $http.post('ec2-52-38-136-232.us-west-2.compute.amazonaws.com:4000/api/public/atividade/busca')
            .then(function cbResponse(response) {

                $scope.atividades = response.data;

            },function cbError(response){
                console.log("Error");
            });

    }

    module.exports = atividades.controller("ListAll", ListAll);
    ListAll.$inject('$scope', '$http');

})();
