'use strict';
angular.module('checkout').controller('errorCtrl', ['$scope', '$state','$cordovaNetwork', errorCtrl]);


function errorCtrl($scope, $state, $cordovaNetwork) {

    var chechConnectivity = function () {
        var isOnline = $cordovaNetwork.isOnline();
        if (isOnline) {
            $state.go("äpp.users");
        }
        else {

        }
    }
   
    chechConnectivity();
}


