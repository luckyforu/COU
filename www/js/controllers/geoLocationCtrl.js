'use strict';
angular.module('checkout').controller('geoLocationCtrl', ['$scope', '$cordovaGeolocation', geoLocationCtrl]);

function geoLocationCtrl($scope, $cordovaGeolocation) {

    var watchOptions = {
        frequency: 1000,
        timeout: 3000,
        enableHighAccuracy: false // may cause errors if true
    };
    var watch = $cordovaGeolocation.watchPosition(watchOptions);

    $scope.getLocation = function () {

        $scope.myPosition = {};
        var posOptions = { timeout: 10000, maximumAge: 10000, enableHighAccuracy: true };

        $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
            $scope.myPosition.latitude = position.coords.latitude;
            $scope.myPosition.longitude = position.coords.longitude;
        }, function (error) {
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
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred while getting location.");
                break;
            }
        });
    }
    $scope.watchLocation = function () {

        watch.then(null,
            function (err) {
                console.log("error" + err);
            },
            function (position) {
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;
                console.log(latitude);
                console.log(longitude);
            });
    }
    $scope.clearWatch = function () {
        $cordovaGeolocation.clearWatch(watch)
          .then(function (result) {
              console.log("success" + result);
          }, function (error) {
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
                  case error.UNKNOWN_ERROR:
                      alert("An unknown error occurred.");
                      break;
              }
          });
    }

};