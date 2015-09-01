'use strict';
angular.module('checkout').factory('geolocationSvc', ['$cordovaGeolocation','$q', geolocationSvc]);

function geolocationSvc($cordovaGeolocation, $q) {

    function getLocation() {
        var posOptions = { timeout: 5000, maximumAge: 0, enableHighAccuracy: true };
        var myPosition = {};
        return $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
                myPosition.latitude = position.coords.latitude;
                myPosition.longitude = position.coords.longitude;
                return $q.resolve(myPosition);
            }, function (error) {
                return $q.reject(error);
            });
    }

    return {
        getLocation:getLocation
    };
    //$cordovaGeolocation.getCurrentPosition(callbackSuccess, callbackError, posOptions);

}