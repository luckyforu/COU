'use strict';
angular.module('checkout').controller('registrationCtrl', ['$scope', '$state', '$cordovaNetwork', 'registrationSvc', registrationCtrl]);

function registrationCtrl($scope, $state, $cordovaNetwork, registrationSvc) {

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
            //$cordovaToast.show('Registered successfully', 'long', 'center')
            //.then(function (success) {
            //    // success
            //}, function (error) {
            //    // error
            //});
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