'use strict';
angular.module('checkout').factory('authToken', function($window) {

    var storage = $window.localStorage;

    var cachedToken;
    var userTokenKey = 'userToken';

    var cachedUserId;
    var userId = 'userId';

    var authToken = {
        isAuthenticated: function() {
            return (!!(this.getToken()));
        },
        setToken: function(token) {
            cachedToken = token;
            storage.setItem(userTokenKey, token);
            //isAuthenticated: true;
        },
        getToken: function() {
            if (!cachedToken)
                cachedToken = storage.getItem(userTokenKey);
            return cachedToken;
        },
        removeToken: function() {
            cachedToken = null;
            storage.removeItem(userTokenKey);
        },
        setUserId: function(userid) {
            cachedUserId = userid;
            storage.setItem(userId, userid);
            //isAuthenticated: true;
        },
        getUserId: function() {
            if (!cachedUserId)
                cachedUserId = storage.getItem(userId);
            return cachedUserId;
        },
        removeUserId: function() {
            cachedUserId = null;
            storage.removeItem(userId);
        }

    }
    return authToken;


});
  


