'use strict';
angular.module('checkout').factory('authInterceptor', function (authToken) {
    return {
        request: function(config) {
            var token = authToken.getToken();
            var userId = authToken.getUserId();
            if (token && userId)
                config.headers.Authorization = 'Bearer ' + token;
            config.headers.UserId = userId;
            return config;
        },
        response: function(response) {
            return response;
        }
    };
});