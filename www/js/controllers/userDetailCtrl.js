'use strict';
angular.module('checkout').controller('userDetailCtrl', ['$scope', '$state', '$location', 'usersSvc', 'userDetailsSvc', userDetailCtrl]);

function userDetailCtrl($scope, $state, $location, usersSvc, userDetailsSvc) {

    var selectUser = function () {
        var userId = $state.params.userId;
        usersSvc.getUserDetail(userId).then(function (response) {
            userDetailsSvc.setUserDetails(response);
            $scope.userName = response.profile.basicInfo.name;
        });
    }

    selectUser();

    $scope.createUser = function (user) {
        usersSvc.createUser(user).then(function (response) {
            $scope.user = response;
            $location.path("/users");
        });
    }

    $scope.viewEducation = function () {
        $state.go("app.education");
    }

    $scope.viewWork = function () {
        $state.go("app.work");
    }

    $scope.viewRelationship = function () {
        $state.go("app.relationship");
    }

    $scope.viewInterests = function () {
        $state.go("app.interests");
    }

}