'use strict';
angular.module('checkout').factory('pictureSvc', ['$http', '$q', 'configSvc', pictureSvc]);

function pictureSvc($http, $q, configSvc) {

    var server = configSvc.appUrl;

    var reqObj = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }

    function getDisplayPic() {
        var defer = $q.defer();
        $http.get(server + "/api/getUserPic")
            .success(function (response) {
                defer.resolve(response);
            }).error(function (e) {
                console.log(e);
                defer.reject();
            });
        return defer.promise;
    }

    function uploadDisplayPic(files) {
        var defer = $q.defer();
        var fd = new FormData();
        //Take the first selected file
        fd.append("file", files[0]);
        var uploadUrl = server + "/api/postUserPic";

        $http.post(uploadUrl, fd, {
            //headers: { 'Content-Type': files[0].type },
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
        })
        .success(function (response) {
            console.log("successssss");
            defer.resolve(response);
        }).error(function (e) {
            console.log("errroorrrr-- " + e);
            defer.reject();
        });
        return defer.promise;
    };

    return {
        uploadDisplayPic: uploadDisplayPic,
        getDisplayPic: getDisplayPic
    };
}
