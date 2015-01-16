'use strict';
angular.module('checkout').controller('pictureCtrl', ['$scope', '$cordovaCamera', pictureCtrl]);

function pictureCtrl($scope, $cordovaCamera) {

    $scope.takePicture = function () {
        var options = {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            //popOverOptions: CameraPopoverOptions,
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
};