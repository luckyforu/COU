/// <reference path="../templates/Error_NoInternet.html" />
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('checkout', ['ngCordova', 'ionic', 'ionic-material', 'ionMdInput', 'checkout.controllers'])

.run(['$ionicPlatform', '$cordovaNetwork', '$state', '$ionicPopup', function ($ionicPlatform, $cordovaNetwork, $state, $ionicPopup) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova) {
            //cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        //if (window.StatusBar) {
        //    // org.apache.cordova.statusbar required
        //    StatusBar.styleDefault();
        //}

        if (!$cordovaNetwork.isOnline()) {
            $state.go("app.noInternet");
        }

        $ionicPlatform.registerBackButtonAction(function (event) {
            if ($state.current.name == "app.home") { // your check here
                $ionicPopup.confirm({
                    title: 'Exit',
                    template: 'Are you sure you want to exit?'
                }).then(function (res) {
                    if (res) {
                        ionic.Platform.exitApp();
                    }
                })
            }
            else {
                navigator.app.backHistory();
            }
        }, 100);

    });




}])

.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider

      .state('app', {
          url: "/app",
          //abstract: true,
          templateUrl: "templates/menu.html",
          controller: 'AppCtrl'
      })
        .state('app.home', {
            url: "/home",
            views: {
                'menuContent': {
                    templateUrl: "templates/HomePage.html",
                }
            }
        })
        .state('app.accordion', {
            url: "/accordion",
            views: {
                'menuContent': {
                    templateUrl: "templates/Accordion.html",
                }
            }
        })
        .state('app.register', {
            url: "/register",
            views: {
                'menuContent': {
                    templateUrl: "templates/Register.html",
                }
            }
        })
         .state('app.login', {
             url: "/login",
             views: {
                 'menuContent': {
                     templateUrl: "templates/login.html",
                 }
             }
         })
        .state('app.logout', {
            url: "/logout",
            controller: 'logoutCtrl',
            views: {
                'menuContent': {
                    templateUrl: "templates/logout.html",
                }
            }
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
                  templateUrl: "templates/Profile_Summary.html",
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

      .state('app.education', {
          url: "/education",
          views: {
              'menuContent': {
                  templateUrl: "templates/Profile_Education.html",
              }
          }
      })

      .state('app.work', {
          url: "/work",
          views: {
              'menuContent': {
                  templateUrl: "templates/Profile_Work.html",
              }
          }
      })

      .state('app.relationship', {
          url: "/relationship",
          views: {
              'menuContent': {
                  templateUrl: "templates/Profile_Relationship.html",
              }
          }
      })

         .state('app.interests', {
             url: "/interests",
             views: {
                 'menuContent': {
                     templateUrl: "templates/Profile_Interests.html",
                 }
             }
         })

        .state('app.noInternet', {
            url: "/noInternet",
            views: {
                'menuContent': {
                    templateUrl: "templates/Error_NoInternet.html",
                }
            }
        })

    .state('app.IMprofile', {
        url: '/improfile',
        views: {
            'menuContent': {
                templateUrl: 'templates/ionicMaterialProfile.html'
            },
            'fabContent': {
                template: '<button id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-plus"></i></button>',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })
    ;



    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');

    $httpProvider.interceptors.push('authInterceptor');
});

