app.controller(
    'UsersImagesController',
    [
        '$scope',
        '$stateParams',
        'UserResource',
        function ($scope, $stateParams, UserResource) {

            $scope.username = $stateParams.username;

            $scope.images = UserResource.images({username: $scope.username});

            console.log('user image controller!');

        }
    ]
);
