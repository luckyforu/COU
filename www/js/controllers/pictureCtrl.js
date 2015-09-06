'use strict';
angular.module('checkout').controller('pictureCtrl', ['$scope', '$cordovaCamera', 'pictureSvc', pictureCtrl]);

function pictureCtrl($scope, $cordovaCamera, pictureSvc) {

    $scope.imgSrc = "../img/logo.png";

    $scope.takePicture = function () {
        var options = {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            //popOverOptions: CameraPopoverOptionsselectPicture
            saveToPhotoAlbum: false
        };
        $cordovaCamera.getPicture(options).then(function (imageData) {
            $scope.imgSrc = "data:image/jpeg;base64," + imageData;
        }, function (err) {
            alert("Error occured while taking picture-" + err);
        });
    };

    $scope.selectPicture = function () {
        var options = {
            quality: 75,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popOverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
        $cordovaCamera.getPicture(options).then(function (imageUri) {
            $scope.imgSrc = imageUri;
        }, function (err) {
            alert("Error occured while selecting picture-" + err);
        });
    };

    $scope.savePicture = function () {
        var userId = "54a3db0c465f643c373ae456";
        //upload($scope.imgSrc);
        pictureSvc.saveImage(userId, $scope.imgSrc).then(function (response) {
            $scope.imgSrc = response;
            console.log("success");
        });
    };

    $scope.uploadFile = function(files) {
        pictureSvc.uploadFile(files).then(function (response) {
            console.log("success");
        });
    };

    $scope.getPicture = function () {
        pictureSvc.getPicture().then(function (response) {
            console.log("success");
            $scope.imageFromDb = response;
        },
        function (err) {
            console.log("Error occured while selecting picture-" + err);
        });
    };

}