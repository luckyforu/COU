'use strict';
angular.module('checkout').controller('logoutCtrl', function (authToken, $state) {

    authToken.removeToken();
    authToken.removeUserId();
    $state.go("app.home");

});
        
    
