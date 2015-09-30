'use strict';
angular.module('checkout').controller('ProfileCtrl', ['$scope', '$state', '$timeout', 'ionicMaterialInk', 'ionicMaterialMotion', ProfileCtrl]);

function ProfileCtrl($scope, $state, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    //// Set Header
    //$scope.$parent.showHeader();
    //$scope.$parent.clearFabs();
    //$scope.isExpanded = false;
    //$scope.$parent.setExpanded(false);
    //$scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function () {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function () {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 5000
        });
    }, 1000);

    // Set Ink
    ionicMaterialInk.displayEffect();
};