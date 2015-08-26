'use strict';
angular.module('checkout').factory('registrationSvc', ['$http', '$q', 'authToken','configSvc', registrationSvc]);

function registrationSvc($http, $q, authToken, configSvc) {

    //var server = "https://warm-brook-1127.herokuapp.com";
    //var server = "http://localhost:3030";
    //var server = "http://localhost:1337";
    var server = configSvc.appUrl;

    function registerUser(user) {
        var defer = $q.defer();
        $http.post(server + "/api/register/", user)
            .success(function (response) {
                authToken.setToken(response.token);
                authToken.setUserId(response._id);
                defer.resolve(response);
            }).error(function (err) {
                console.log(err);
                defer.reject(err);
            });
        return defer.promise;
    }

    function isUsernameAlreadyInUse(username) {
        var defer = $q.defer();
        $http.post(server + "/api/register/checkForUsernameExistence", username)
            .success(function (response) {
                defer.resolve(response);
            }).error(function (err) {
                console.log(err);
                defer.reject(err);
            });
        return defer.promise;
    }

    function login(user) {
        var defer = $q.defer();
        $http.post(server + "/api/login/", user)
            .success(function (response) {
                authToken.setToken(response.token);
                defer.resolve(response);
            }).error(function (err) {
                console.log(err);
                defer.reject(err);
            });
        return defer.promise;
    }


    return {
        registerUser: registerUser,
        isUsernameAlreadyInUse: isUsernameAlreadyInUse,
        login: login
    };
}
