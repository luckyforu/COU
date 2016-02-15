'use strict';
angular.module('checkout').factory('registrationSvc', ['$http', '$q', '$cordovaOauth', 'authToken', 'configSvc', registrationSvc]);

function registrationSvc($http, $q, $cordovaOauth, authToken, configSvc) {

    //var server = "https://warm-brook-1127.herokuapp.com";
    //var server = "http://localhost:3030";
    //var server = "http://localhost:1337";
    var server = configSvc.appUrl;

    function registerUser(user) {
        var defer = $q.defer();
        $http.post(server + "/api/register/", user)
            .success(function (response) {
                authToken.setToken(response.token);
                authToken.setUserId(response._id);
                defer.resolve(response);
            }).error(function (err) {
                console.log(err);
                defer.reject(err);
            });
        return defer.promise;
    }

    function isUsernameAlreadyInUse(username) {
        var defer = $q.defer();
        $http.post(server + "/api/register/checkForUsernameExistence", username)
            .success(function (response) {
                defer.resolve(response);
            }).error(function (err) {
                console.log(err);
                defer.reject(err);
            });
        return defer.promise;
    }

    function registerSocialUser(user) {
        var defer = $q.defer();
        $http.post(server + "/api/social/register", user)
            .success(function (response) {
                authToken.setToken(response.token);
                authToken.setUserId(response._id);
                defer.resolve(response);
            }).error(function (err) {
                console.log(err);
                defer.reject(err);
            });
        return defer.promise;
    }

    function login(user) {
        var defer = $q.defer();
        $http.post(server + "/api/login/", user)
            .success(function (response) {
                authToken.setToken(response.token);
                authToken.setUserId(response._id);
                defer.resolve(response);
            }).error(function (err) {
                console.log(err);
                defer.reject(err);
            });
        return defer.promise;
    }

    function getFacebookData() {
        var defer = $q.defer();
        $cordovaOauth.facebook("468427289992709", ["email"]).then(function (result) {
            //$localStorage.accessToken = result.access_token;
            $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: result.access_token, fields: "id,email,name,gender,location,website,picture,relationship_status", format: "json" } }).success(function (response) {
                var facebookResponse = {
                    facebook: {
                        provider: "facebook",
                        id: response["id"],
                        name: response["name"],
                        email: response["email"],
                        imageUrl: response.picture.data.url
                    }
                }
                defer.resolve(facebookResponse);
            }).error(function (error) {
                defer.reject(error);
            });
        }, function (error) {
            defer.reject(error);
        });
        return defer.promise;
    }

    function getGoogleData() {
        var defer = $q.defer();
        $cordovaOauth.google("238615315349-1c6c85sv5b9m2n4vjouqd7sfaktq8dpp.apps.googleusercontent.com",
            ["https://www.googleapis.com/auth/urlshortener",
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/plus.me"])
           .then(function (result) {
               var accessToken;
               accessToken = JSON.stringify(result);
               $http({ method: "GET", url: "https://www.googleapis.com/plus/v1/people/me?access_token=" + result.access_token }).
                success(function (response) {
                    var googleResponse = {
                        google: {
                            provider: 'google',
                            id: response["id"],
                            first_name: response["name"]["givenName"],
                            last_name: response["name"]["familyName"],
                            display_name: response["displayName"],
                            email: response.emails[0]["value"],
                            imageUrl: response.image.url
                        }
                    };
                    defer.resolve(googleResponse);
                }, function (error) {
                    defer.reject(error);
                });
           }, function (error) {
               defer.reject(error);
           });

        return defer.promise;
    }

    return {
        isUsernameAlreadyInUse: isUsernameAlreadyInUse,
        registerUser: registerUser,
        login: login,
        getFacebookData: getFacebookData,
        getGoogleData: getGoogleData,
        registerSocialUser: registerSocialUser
    };
}
