"use strict";

// Initialize angular

var app = angular.module('ctrlv', [
    'ui.router',
    'ngResource',
    'ngSanitize',
    'LocalStorageModule',
    'angularModalService',
    'ngAnimate'
]);

/**
 * Angular
 */

// Routes
app.config(function($locationProvider, $stateProvider, $urlRouterProvider, localStorageServiceProvider) {

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
            controller: 'HomeController',
            data : {
                bodyClass : 'home'
            }
        })
        .state('help', {
            url: "/help",
            templateUrl: "views/help.html",
            controller: 'HelpController'
        })
        .state('image', {
            url: "/{imageId:int}",
            templateUrl: "views/image.html",
            controller: 'ImageController'
        })
        .state('user', {
            url: "/user/{username:string}",
            templateUrl: "views/user.html",
            controller: 'UserController'
        })
        .state('user-favourites', {
            url: "/user/{username:string}/favourites",
            templateUrl: "views/user/favourites.html",
            controller: 'UserFavouritesController'
        });
});

app.run(function($rootScope, AuthService, ImagePasterService) {

    AuthService.checkSession();
    console.log('ImagePasterService', ImagePasterService);
});

