'use strict';
angular.module('checkout').factory('configSvc', function () {

    var configData = {
        appUrl: "http://localhost:1337"
        //appUrl: "https://warm-brook-1127.herokuapp.com"
    }
    return configData;
});
