'use strict';
angular.module('checkout').factory('configSvc', function () {

    var configData = {
        appUrl: "http://localhost:1337"
    }
    return configData;
});
