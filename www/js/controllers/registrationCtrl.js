'use strict';
angular.module('checkout').controller('registrationCtrl', ['$scope', '$state', '$cordovaToast', '$cordovaNetwork', 'registrationSvc', registrationCtrl]);

function registrationCtrl($scope, $state, $cordovaToast, $cordovaNetwork, registrationSvc) {

    //var isOnline = $cordovaNetwork.isOnline();
    //if (!isOnline) {
    //    alert("You are offline");
    //    $state.go("app.error.noInternet");
    //}

    $scope.register = function (registerUser) {

        registrationSvc.isUsernameAlreadyInUse(registerUser).then(function (response) {
            console.log("Username available");
            registrationSvc.registerUser(registerUser).then(function (res) {
                console.log("Registered successfully");
                $cordovaToast.show('Registered successfully', 'short', 'bottom')
                .then(function (success) { }, function (error) { });

                $state.go("app.users");
            }, function (error) {
                console.log("Registration failed " + error);
                $cordovaToast.show('Registered failed', 'long', 'center')
                .then(function (success) { }, function (error) { });
            });
        }, function (err) {
            console.log("Username unavailable " + err);
            $cordovaToast.show('Username in use, Please choose other username', 'long', 'center')
                .then(function (success) { }, function (error) { });
        });

    }

    $scope.closeRegister = function () {
        $scope.modal.hide();
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

}