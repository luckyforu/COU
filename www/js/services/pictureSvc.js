'use strict';
angular.module('checkout').factory('pictureSvc', ['$http', '$q', 'configSvc', pictureSvc]);

function pictureSvc($http, $q, configSvc) {

    var server = configSvc.appUrl;

    var reqObj = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }

    function saveImage(userId, image) {
        var defer = $q.defer();
        image = "http://localhost:8100/img/logo.png";
        $http.post(server + "/api/user/userId/image", image, reqObj)
            .success(function (response) {
                defer.resolve(response);
            }).error(function (e) {
                console.log(e);
                defer.reject();
            });
        return defer.promise;
    }

    function uploadFile(files) {
        var defer = $q.defer();
        var fd = new FormData();
        //Take the first selected file
        fd.append("file", files[0]);
        var uploadUrl = server + "/api/user/userId/imagenew";

        $http.post(uploadUrl, fd, {
            //            withCredentials: true,
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
        })
        .success(function (response) {
            console.log("successssss");
            defer.resolve(response);
        }).error(function (e) {
            console.log("errroorrrr--" + e);
            defer.reject();
        });

    };

    function getPicture() {
        var defer = $q.defer();
        var imgObj = {
            headers: {
                'Content-Type': 'image/png'
            }
        }
        //var config = {
        //    'Content-Type': 'image/png'
        //}
        //var uploadUrl = "http://localhost:1337/api/user/userId/getimage";
        $http.get(server + "/api/user/userId/getimage", imgObj)
            .success(function (response) {
                defer.resolve(response);
            }).error(function (e) {
                console.log(e);
                defer.reject();
            });
        return defer.promise;
    };

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

    function uploadDisplayPic(imageData) {
        var defer = $q.defer();
        $http.post(server + "/api/picture/postisplayPic", imageData)
            .success(function (response) {
                defer.resolve(response);
            }).error(function (e) {
                console.log(e);
                defer.reject();
            });
        return defer.promise;
    }

    function getDisplayPic(user) {
        var defer = $q.defer();
        $http.get(server + "/api/picture/getDisplayPic", user)
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
        createUser: createUser,
        uploadFile: uploadFile,
        getPicture: getPicture,
        uploadDisplayPic: uploadDisplayPic,
        getDisplayPic: getDisplayPic
    };
}
