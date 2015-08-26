'use strict';
angular.module('checkout').controller('homePageCtrl', ['$scope', '$state', homePageCtrl]);

function homePageCtrl($scope, $state) {

    $scope.register = function() {
        $state.go("app.register");
    };

    $scope.login = function () {
        $state.go("app.login");
    };
};