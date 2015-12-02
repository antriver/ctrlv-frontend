app.controller(
    'UserController',
    function ($scope, $rootScope, $stateParams, UserResource) {

        $scope.username = $stateParams.username;

        $scope.loading = true;
        $scope.images = [];

        UserResource.get({username: $scope.username}, function(user) {
           $rootScope.title = '<i class="typ typ-image"></i> ' + user.username + "'s Images";
        });

        UserResource.getImages({username: $scope.username}, function(images) {
            $scope.loading = false;
            $scope.images = images;
        });

        console.log('user controller!');

    }
);
