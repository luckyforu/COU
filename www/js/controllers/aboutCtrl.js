(function () {
    'use strict';
    angular.module('checkout').controller('aboutUsCtrl', [aboutUsCtrl]);

    function aboutUsCtrl() {
        var vm = this;
        var clickMe = function() {
            console.log("HI");
        }
    }

})();