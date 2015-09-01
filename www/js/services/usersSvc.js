'use strict';
angular.module('checkout').factory('usersSvc', ['$http', '$q', 'configSvc', usersSvc]);

function usersSvc($http, $q, configSvc) {

    var server = configSvc.appUrl;

    function getUsers(location) {
        var defer = $q.defer();
        $http.post(server + "/api/users", location)
            .success(function (response) {
                defer.resolve(response);
            }).error(function (err) {
                console.log(err);
                defer.reject(err);
            });
        return defer.promise;
    }

    function getUserDetail(userId) {
        var defer = $q.defer();
        $http.get(server + "/api/user/" + userId)
            .success(function (response) {
                defer.resolve(response);
            }).error(function (err) {
                console.log(err);
                defer.reject(err);
            });
        return defer.promise;
    }

    function createUser(user) {
        var defer = $q.defer();
        $http.post(server + "/api/user/", user)
            .success(function (response) {
                defer.resolve(response);
            }).error(function (err) {
                console.log(err);
                defer.reject(err);
            });
        return defer.promise;
    }

    function updateUserLocation(location) {
        var defer = $q.defer();
        $http.post(server + "/api/user/updateLocation/", location)
            .success(function (response) {
                defer.resolve(response);
            }).error(function (err) {
                console.log(err);
                defer.reject(err);
            });
        return defer.promise;
    }

    function updateUserProfile(profile) {
        var defer = $q.defer();
        $http.post(server + "/api/user/updateProfile/", profile)
            .success(function (response) {
                defer.resolve(response);
            }).error(function (err) {
                console.log(err);
                defer.reject(err);
            });
        return defer.promise;
    }
    
    return {
        getUsers: getUsers,
        getUserDetail: getUserDetail,
        createUser: createUser,
        updateUserLocation: updateUserLocation,
        updateUserProfile: updateUserProfile
    };
}
