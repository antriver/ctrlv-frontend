"use strict";

// Initialize angular

var app = angular.module('ctrlv', [
    'ui.router',
    'ngResource',
    'ngSanitize',
    'LocalStorageModule',
    'angularModalService',
    'ngAnimate',
    'rt.debounce'
]);

/**
 * Angular
 */

// Routes
app.config(function($httpProvider, $locationProvider, $stateProvider, $urlRouterProvider, localStorageServiceProvider) {

    /*$httpProvider.defaults.headers.common = {
        'RemoteUser': 'billybob'
    };*/

    $locationProvider.html5Mode(true);

    localStorageServiceProvider
        .setPrefix('ctrlv')
        .setStorageType('localStorage')
        .setStorageCookie(0, '/');

    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise('/');

    // Now set up the states
    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "views/home.html",
            controller: 'HomeController'
        })
        .state('help', {
            url: "/help",
            templateUrl: "views/help.html",
            controller: 'HelpController'
        })
        .state('image', {
            url: "/{imageId:int}",
            templateUrl: "views/image.html",
            controller: 'ImageController',
            params: {
                albumId: null
            },
        })
        .state('user', {
            url: "/user/{username:string}",
            templateUrl: "views/user.html",
            controller: 'UserController'
        })
        .state('user-page', {
            url: "/user/{username:string}/{page:int}",
            templateUrl: "views/user.html",
            controller: 'UserController'
        })
        .state('user-favourites', {
            url: "/user/{username:string}/favourites",
            templateUrl: "views/user/favourites.html",
            controller: 'UserFavouritesController'
        });
});

app.run(function($rootScope, $state, AuthService, ImagePasterService) {
    // ImagePasterService is injected here so it gets initialized


    //$httpProvider.defaults.headers.post["Content-Type"] = "text/plain";

    $rootScope.$state = $state;


    AuthService.checkSession();

    $rootScope.user = AuthService.getUser();

    $rootScope.$on('login', function(event, args) {
        $rootScope.user = args.user;
    });

    $rootScope.$on('logout', function() {
        $rootScope.user = false;
    });

    $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
        $('body').attr('data-previous', from.name);
    });
});

