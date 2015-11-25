// Initialize angular

var app = angular.module('ctrlv', [
    'ui.router',
    'ngResource'
]);

/**
 * Angular
 */

// Routes
app.config(function($locationProvider, $stateProvider, $urlRouterProvider) {

    $locationProvider.html5Mode(true);

    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise('/');

    // Now set up the states
    $stateProvider
        .state('index', {
            url: "/",
            templateUrl: "views/index.html",
            controller: 'RootController'
        })
        .state('image', {
            url: "/{imageId:int}",
            templateUrl: "views/image.html",
            controller: 'ImageController'
        })
        .state('userimages', {
            url: "/user/{username:string}",
            templateUrl: "views/user/images.html",
            controller: 'UsersImagesController'
        });
});

app.run(function($rootScope, SessionResource) {

    // Add the name of the current route to the body element
    $rootScope.$on('$routeChangeSuccess', function(ev, data) {
        $('body').attr('data-route', '');
        if (data.$$route.controllerAs) {
            $('body').attr('data-route', data.$$route.controllerAs);
        }
    });

    $rootScope.session = SessionResource.get({sessionKey: '5cae20a3e77a5653d930cedbe50eb2d95eb03d62'});


});
