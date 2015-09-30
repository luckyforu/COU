'use strict';
angular.module('checkout').controller('userProfileCtrl', ['$scope', '$state', 'usersSvc', 'userDetailsSvc', userDetailCtrl]);

function userDetailCtrl($scope, $state, usersSvc, userDetailsSvc) {

    function getUserDetails() {
        $scope.userDetails = userDetailsSvc.getUserDetails();
    }
    getUserDetails();

}