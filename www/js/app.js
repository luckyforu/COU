// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('checkout', ['ngCordova', 'ionic', 'checkout.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })
      .state('app.aboutUs', {
          url: "/aboutUs",
          views: {
              'menuContent': {
                  templateUrl: "templates/AboutUs.html",
              }
          }
      })
      .state('app.picture', {
          url: "/picture",
          views: {
              'menuContent': {
                  templateUrl: "templates/Picture.html",
              }
          }
      })
      .state('app.geoLocation', {
          url: "/geoLocation",
          views: {
              'menuContent': {
                  templateUrl: "templates/GeoLocation.html",
              }
          }
      })
    .state('app.createUser', {
        url: "/createUser",
        views: {
            'menuContent': {
                templateUrl: "templates/CreateUser.html",
            }
        }
    })

    .state('app.editProfile', {
        url: "/editProfile",
        //abstract: true,
        views: {
            'menuContent': {
                templateUrl: "templates/EditProfile.html",
            }
        }
    })
    
    .state('app.users', {
        url: "/users",
        views: {
            'menuContent': {
                templateUrl: "templates/Users.html",
            }
        }
    })

    .state('app.user', {
        url: "/users/:userId",
        views: {
            'menuContent': {
                templateUrl: "templates/UserDetail.html",
            }
        }
    })

    .state('app.editProfile.basicInfo', {
        url: "/basicInfo",
        views: {
            'menuContent': {
                templateUrl: "templates/Profile_BaicInfo.html",
            }
        }
    })

    .state('app.editProfile.education', {
        url: "/education",
        views: {
            'menuContent': {
                templateUrl: "templates/Profile_Education.html",
            }
        }
    })

    .state('app.editProfile.work', {
        url: "/work",
        views: {
            'menuContent': {
                templateUrl: "templates/Profile_Work.html",
            }
        }
    })

    .state('app.editProfile.relationship', {
        url: "/relationship",
        views: {
            'menuContent': {
                templateUrl: "templates/Profile_Relationship.html",
            }
        }
    })

    ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/users');
});

