'use strict';
angular.module('checkout').controller('registrationCtrl', ['$scope', '$state', '$cordovaToast', 'registrationSvc', registrationCtrl]);

function registrationCtrl($scope, $state, $cordovaToast, registrationSvc) {

    $scope.register = function (registerUser) {

        registrationSvc.isUsernameAlreadyInUse(registerUser).then(function (response) {
            console.log("Username available");
            //$cordovaToast.show('Here is a message', 'long', 'center')
            //.then(function (success) {
            //    // success
            //}, function (error) {
            //    // error
            //});

            registrationSvc.registerUser(registerUser).then(function (res) {
                console.log("Registered successfully");
                $state.go("app.users");
            }, function (error) {
                console.log("Registration failed" + error);
            });
        }, function (err) {
            console.log("Username unavailable" + err);
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
            console.log("Login failed" + error);
        });
    };
}