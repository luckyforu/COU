'use strict';
angular.module('checkout').controller('usersCtrl', ['$state','$stateParams', '$scope', '$http', '$cordovaGeolocation', 'geolocationSvc', 'usersSvc', usersCtrl]);

function usersCtrl($state,$stateParams, $scope, $http, $cordovaGeolocation, geolocationSvc, usersSvc) {


    var getUsers = function () {
        console.log($stateParams);
        geolocationSvc.getLocation().then(function (location) {
            console.log(location);

            //Get user based on current location
            usersSvc.getUsers(location).then(function (response) {
                $scope.users = response;
            });

            //Update user current location for other users to this user
            usersSvc.updateUserLocation(location).then(function () {
                console.log("successfully updated user location");
            }, function (error) {
                console.log("User location update failed" + error);
            });

        }, function (error) {
            console.log(error);
        });

        //setTimeout(getUsers, 10000);
    };

    getUsers();
}

