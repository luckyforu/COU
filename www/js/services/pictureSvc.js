'use strict';
angular.module('checkout').factory('pictureSvc', ['$http', '$q', pictureSvc]);

function pictureSvc($http, $q) {

    function saveImage(userId, image) {
        var defer = $q.defer();
        $http.post("http://localhost:1317/api/user/userId/image" + image)
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
        $http.post("http://localhost:1317/api/user/", user)
            .success(function (response) {
                defer.resolve(response);
            }).error(function (e) {
                console.log(e);
                defer.reject();
            });
        return defer.promise;
    }

    return {
        saveImage: saveImage,
        createUser: createUser
    };
}
