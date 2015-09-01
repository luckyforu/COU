'use strict';
angular.module('checkout').controller('usersCtrl', ['$state','$stateParams', '$scope', '$http', '$cordovaGeolocation', 'geolocationSvc', 'usersSvc', usersCtrl]);

function usersCtrl($state,$stateParams, $scope, $http, $cordovaGeolocation, geolocationSvc, usersSvc) {


    var getUsers = function () {
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
            alert(error);
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    alert("User denied the request for Geolocation.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert("Location information is unavailable.");
                    break;
                case error.TIMEOUT:
                    alert("The request to get user location timed out.");
                    break;
                default:
                    alert("An unknown error occurred.");
                    break;
            }
        });

        //setTimeout(getUsers, 10000);
    };

    getUsers();
}

