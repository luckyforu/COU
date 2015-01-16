'use strict';
angular.module('checkout').controller('geoLocationCtrl', ['$scope', '$cordovaGeolocation', geoLocationCtrl]);

function geoLocationCtrl($scope, $cordovaGeolocation) {

    $scope.getLocation = function () {

        $scope.myPosition = {};
        var posOptions = { timeout: 10000, maximumAge:10000, enableHighAccuracy: true };

        $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
              $scope.myPosition.latitude = position.coords.latitude;
              $scope.myPosition.longitude = position.coords.longitude;
        }, function (err) {
            alert("An error occured in getting location-" + err);
        });

        //var watchOptions = {
        //    frequency: 1000,
        //    timeout: 3000,
        //    enableHighAccuracy: false // may cause errors if true
        //};

        //var watch = $cordovaGeolocation.watchPosition(watchOptions);
        //watch.then(
        //  null,
        //  function (err) {
        //      // error
        //  },
        //  function (position) {
        //      var latitude = position.coords.latitude;
        //      var longitude = position.coords.longitude;
        //      console.log(latitude);
        //      console.log(longitude);
        //  });


        //watch.clearWatch();
        //// OR
        //$cordovaGeolocation.clearWatch(watch)
        //  .then(function (result) {
        //      // success
        //  }, function (error) {
        //      // error
        //  });
    };
};