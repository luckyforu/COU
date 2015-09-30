'use strict';
angular.module('checkout').factory('userDetailsSvc', ['$http', '$q', 'configSvc', usersSvc]);

function usersSvc($http, $q, configSvc) {

    var server = configSvc.appUrl;

    this.userDetails = null;

    function getUserDetails() {
        return this.userDetails;
    }

    function setUserDetails(userDetails) {
        this.userDetails = userDetails;
    }

    return {
        getUserDetails: getUserDetails,
        setUserDetails: setUserDetails

    };
}
