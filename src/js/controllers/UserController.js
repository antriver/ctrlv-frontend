app.controller(
    'UserController',
    function ($scope, $rootScope, $state, $stateParams, AuthService, UserResource) {

        $scope.images = [];
        $rootScope.loading = true;
        $scope.username = $stateParams.username;

        if ($stateParams.page === 1) {
            $state.go('user', {username: $scope.username});
            return;
        }

        $scope.currentPage = $stateParams.page ? $stateParams.page : 1;
        $scope.totalPages = 0;
        $scope.url = '#';

        $rootScope.title = '';
        $rootScope.subtitle = '';

        UserResource.get({username: $scope.username}, function(user) {
            $rootScope.title = '<i class="typ typ-image"></i> ' + user.username + "'s Images";

            $scope.url = '/user/' + user.username;

            // FIXME: happens too fast when loading directly on /user/username page
            if ($rootScope.user && $rootScope.user.userId === user.userId) {
                UserResource.getAlbums({username: $scope.username}, function (albums) {
                    $scope.albums = albums;
                });
            }
        });

        UserResource.getImages({username: $scope.username, page: $scope.currentPage}, function(data) {
            $rootScope.loading = false;
            $scope.images = data.images;
            $scope.totalPages = data.lastPage;
            console.log(data);
        });
    }
);
