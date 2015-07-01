// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ui.router', 'starter.controllers', 'starter.services','ngCordova'])

    .run(function ($ionicPlatform,$cordovaNetwork) {
        $ionicPlatform.ready(function () {

            //推送插件
            window.plugins.jPushPlugin.init();

            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }
            //判断网络状态
            document.addEventListener("deviceready", function () {

                //var type = $cordovaNetwork.getNetwork()
                //
                //var isOnline = $cordovaNetwork.isOnline()
                //
                //var isOffline = $cordovaNetwork.isOffline()

                // listen for Online event
                $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
                    var onlineState = networkState;
                    console.log("device online...");
                })

                // listen for Offline event
                $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
                    var offlineState = networkState;
                    //提醒用户的网络异常
                    $ionicLoading.show({
                        template: '网络异常，不能连接到服务器！'
                    });
                })

            }, false);
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })

            // Each tab has its own nav history stack:

            .state('tab.websites', {
                url: '/websites',
                cache: false,
                views: {
                    'tab-websites': {
                        templateUrl: 'templates/tab-websites.html',
                        controller: 'WebSitesCtrl'
                    }
                }
            })

            .state('tab.testspeed', {
                url: '/testspeed',
                cache: false,
                views: {
                    'tab-testspeed': {
                        templateUrl: 'templates/tab-testspeed.html',
                        controller: 'TestSpeedCtrl'
                    }
                }
            })

            .state('tab.searchengine', {
                url: '/searchengine',
                cache: false,
                views: {
                    'tab-searchengine': {
                        templateUrl: 'templates/tab-searchengine.html',
                        controller: 'SearchEngineCtrl'
                    }
                }
            })

            .state('tab.account', {
                url: '/account',
                cache: false,
                views: {
                    'tab-account': {
                        templateUrl: 'templates/tab-account.html',
                        controller: 'AccountCtrl'
                    }
                }
            })

            .state('register', {
                url: '/register',
                cache: false,
                templateUrl: 'templates/register.html',
                controller: 'RegisterCtrl'
            })

            .state('about', {
                url: '/tab/account/about',
                cache: false,
                templateUrl: 'templates/about.html',
                controller: 'AboutCtrl'
            })

            .state('resetpassword', {
                url: '/tab/account/resetpassword',
                cache: false,
                templateUrl: 'templates/resetpassword.html',
                controller: 'ResetPasswordCtrl'
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/account');

    });
