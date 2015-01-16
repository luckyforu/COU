'use strict';
angular.module('checkout').controller('usersCtrl', ['$state', '$scope', '$http', 'usersSvc', usersCtrl]);

function usersCtrl($state, $scope, $http, usersSvc) {

    var getUsers = function () {
        usersSvc.getUsers().then(function (response) {
            $scope.users = response;
        });
    }
    getUsers();


}
