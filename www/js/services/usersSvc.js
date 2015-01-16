'use strict';
angular.module('checkout').factory('usersSvc', ['$http', '$q', usersSvc]);

function usersSvc($http, $q) {
	
	var server = "http://localhost:3030";
    function getUsers() {
        var defer = $q.defer();
        $http.get(server + "/api/users")
		
            .success(function (response) {
                defer.resolve(response);
            }).error(function (e) {
                console.log(e);
                defer.reject();
            });
		return defer.promise;
    }

    function getUserDetail(userId) {
        var defer = $q.defer();
        $http.get(server + "/api/user/" + userId)
            .success(function (response) {
                defer.resolve(response);
            }).error(function (e) {
                console.log(e);
                defer.reject();
            });
        return defer.promise;
    }

    function createUser(user) {
        var defer = $q.defer();
        $http.post(server + "/api/user/", user)
            .success(function (response) {
                defer.resolve(response);
            }).error(function (e) {
                console.log(e);
                defer.reject();
            });
        return defer.promise;
    }

    return {
        getUsers: getUsers,
        getUserDetail: getUserDetail,
        createUser: createUser
    };
}
