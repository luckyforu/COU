'use strict';
angular.module('checkout').controller('usersCtrl', ['$state', '$stateParams', '$scope', '$http', '$timeout', '$cordovaGeolocation', 'ionicMaterialInk', 'ionicMaterialMotion', 'geolocationSvc', 'configSvc', 'usersSvc', usersCtrl]);

function usersCtrl($state, $stateParams, $scope, $http, $timeout, $cordovaGeolocation, ionicMaterialInk, ionicMaterialMotion, geolocationSvc, configSvc, usersSvc) {

    //$scope.hideNavBar = function () {
    //    document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    //};

    //$scope.showNavBar = function () {
    //    document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    //};

    //$scope.noHeader = function () {
    //    var content = document.getElementsByTagName('ion-content');
    //    for (var i = 0; i < content.length; i++) {
    //        if (content[i].classList.contains('has-header')) {
    //            content[i].classList.toggle('has-header');
    //        }
    //    }
    //};

    //$scope.setExpanded = function (bool) {
    //    $scope.isExpanded = bool;
    //};

    //$scope.setHeaderFab = function (location) {
    //    var hasHeaderFabLeft = false;
    //    var hasHeaderFabRight = false;

    //    switch (location) {
    //        case 'left':
    //            hasHeaderFabLeft = true;
    //            break;
    //        case 'right':
    //            hasHeaderFabRight = true;
    //            break;
    //    }

    //    $scope.hasHeaderFabLeft = hasHeaderFabLeft;
    //    $scope.hasHeaderFabRight = hasHeaderFabRight;
    //};

    //$scope.hasHeader = function () {
    //    var content = document.getElementsByTagName('ion-content');
    //    for (var i = 0; i < content.length; i++) {
    //        if (!content[i].classList.contains('has-header')) {
    //            content[i].classList.toggle('has-header');
    //        }
    //    }

    //};

    //$scope.hideHeader = function () {
    //    $scope.hideNavBar();
    //    $scope.noHeader();
    //};

    //$scope.showHeader = function () {
    //    $scope.showNavBar();
    //    $scope.hasHeader();
    //};

    //$scope.clearFabs = function () {
    //    var fabs = document.getElementsByClassName('button-fab');
    //    if (fabs.length && fabs.length > 1) {
    //        fabs[0].remove();
    //    }
    //};
    $scope.imageRepo = configSvc.appUrl + "/api/getUserPic/";

    var getUsers = function () {
        geolocationSvc.getLocation().then(function (location) {
            console.log(location);
            //Get user based on current location
            usersSvc.getUsers(location).then(function (response) {
                $scope.users = response;

            }, function (error) {
                console.log("Not able to get users with this location " + error);
                $cordovaToast.show('Did not get users with your location', 'long', 'bottom')
                .then(function (success) { }, function (error) { });
            });

            //Update user current location for other users to this user
            usersSvc.updateUserLocation(location).then(function () {
                console.log("successfully updated user location");
            }, function (error) {
                console.log("User location update failed " + error);
            });

        }, function (error) {
            alert(error);
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    alert("User denied the request for Geolocation.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert("Location information is unavailable.");
                    break;
                case error.TIMEOUT:
                    alert("The request to get user location timed out.");
                    break;
                default:
                    alert("An unknown error occurred.");
                    break;
            }
        });

        //$timeout(function () {
        //    $scope.isExpanded = true;
        //    $scope.$parent.setExpanded(true);
        //}, 1000);

        ionicMaterialMotion.fadeSlideInRight();
        ionicMaterialInk.displayEffect();
        //setTimeout(getUsers, 10000);

    };

    getUsers();



}

