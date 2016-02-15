'use strict';
angular.module('checkout').controller('homePageCtrl', ['$scope', '$state', '$location', '$timeout', '$cordovaToast', 'configSvc', 'registrationSvc', 'ionicMaterialInk', 'ionicMaterialMotion', homePageCtrl]);

function homePageCtrl($scope, $state, $location, $timeout, $cordovaToast, configSvc, registrationSvc, ionicMaterialInk, ionicMaterialMotion) {

    //ionic.Platform.ready(function () {
    //    StatusBar.hide();
    //});
    $scope.appUrl = configSvc.appUrl;
    $scope.loginData = {};
    $scope.loginData.username = "";
    $scope.loginData.password = "";

    $timeout(function () {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();

    $scope.goRegister = function () {
        $state.go("app.register");
    };

    $scope.login = function (user) {
        $scope.user = {};
        registrationSvc.login(user).then(function (response) {
            console.log("Logged in successfully");
            $scope.user.Id = response._id;
            //userContextSvc.setUserInfo(response);
            $state.go("app.users", { user: response });
        }, function (error) {
            console.log("Login failed " + error);
            $cordovaToast.show('Username &/ Password combination is incorrect', 'long', 'center')
                .then(function (success) { }, function (error) { });
        });
    };

    $scope.facebookLogin = function () {
        $scope.user = {};
        registrationSvc.getFacebookData().then(function (response) {
            $scope.user = {
                loginType: response.facebook.provider,
                id: response.facebook.id,
                name: response.facebook.name,
                email: response.facebook.email,
                imageUrl: response.facebook.imageUrl
            };
            registrationSvc.registerSocialUser($scope.user).then(function (response) {
                $state.go("app.users", { user: response });
            }, function (error) {
                $cordovaToast.show('Something went wrong, lets try logging in again', 'long', 'center')
                .then(function (success) { }, function (error) { });
                $state.go("app.home");
            });

        }, function (error) {
            console.log("Login failed " + error);
            $cordovaToast.show('Username &/ Password combination is incorrect', 'long', 'center')
                .then(function (success) { }, function (error) { });
        });
    };

    $scope.googleLogin = function () {
        $scope.user = {};
        registrationSvc.getGoogleData().then(function (response) {
            $scope.user = {
                loginType: response.google.provider,
                id: response.google.id,
                name: response.google.display_name,
                email: response.google.email,
                imageUrl: response.google.imageUrl
            };
            registrationSvc.registerSocialUser($scope.user).then(function (response) {
                $state.go("app.users", { user: response });
            }, function (error) {
                $cordovaToast.show('Something went wrong, lets try logging in again', 'long', 'center')
                .then(function (success) { }, function (error) { });
                $state.go("app.home");
            });
        }, function (error) {
            $cordovaToast.show('Username &/ Password combination is incorrect', 'long', 'center')
                .then(function (success) { }, function (error) { });
        });
    };

};