'use strict';
angular.module('checkout').controller('homePageCtrl', ['$scope', '$state', '$timeout', 'registrationSvc', 'ionicMaterialInk', 'ionicMaterialMotion', homePageCtrl]);

function homePageCtrl($scope, $state, $timeout, registrationSvc, ionicMaterialInk, ionicMaterialMotion) {

    ionic.Platform.ready(function () {
        StatusBar.hide();
    });

    $scope.loginData = {};
    $timeout(function () {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
    $scope.goRegister = function() {
        $state.go("app.register");
    };

    //$scope.login = function () {
    //    $state.go("app.login");
    //};

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
};