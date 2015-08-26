'use strict';
angular.module('checkout').factory('geolocationSvc', ['$cordovaGeolocation', geolocationSvc]);

function geolocationSvc($cordovaGeolocation) {

    function getCurrentLocation() {
        var myPosition = {};
        var posOptions = { timeout: 5000, maximumAge: 0, enableHighAccuracy: true };

        return $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
                myPosition.latitude = position.coords.latitude;
                myPosition.longitude = position.coords.longitude;
            return myPosition;
        }, function (error) {
            console.log(error);
            return result;
        });
    }

    function getLocation() {
        var posOptions = { timeout: 5000, maximumAge: 0, enableHighAccuracy: true };
        var myPosition = {};
        return $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
                myPosition.latitude = position.coords.latitude;
                myPosition.longitude = position.coords.longitude;
                return myPosition;
            }, function (error) {
                return error;
            });
    }

    return {
        getCurrentLocation: getCurrentLocation,
        getLocation:getLocation
    };
    //$cordovaGeolocation.getCurrentPosition(callbackSuccess, callbackError, posOptions);

}