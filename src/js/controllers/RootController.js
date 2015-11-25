/**
 * @type {angular.Module} app
 */
app.controller(
    'RootController',
    [
        '$scope',
        'SessionResource',
        function ($scope, SessionResource) {

            $scope.sessionKey = 'Loading';
            $scope.username = 'Loading username';

            //$scope.init();

        }
    ]
);
