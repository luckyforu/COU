'use strict';
angular.module('checkout').controller('userDetailCtrl', ['$scope', '$state', '$location', 'usersSvc', userDetailCtrl]);

function userDetailCtrl($scope, $state, $location, usersSvc) {

    var selectUser = function () {
        //var userId = $state.params.userId;
        usersSvc.getUserDetail().then(function (response) {
            $scope.myuser = response;
        });
    }

    selectUser();

    $scope.createUser = function (user) {
        usersSvc.createUser(user).then(function (response) {
            $scope.user = response;
            $location.path("/users");
        });
    }

}