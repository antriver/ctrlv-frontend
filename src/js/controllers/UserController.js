app.controller(
    'UserController',
    function ($scope, $rootScope, $state, $stateParams, AuthService, UserResource) {

        console.log('UserController');

        $rootScope.loading = true;
        $rootScope.title = '';
        $rootScope.subtitle = '';

        $scope.images = [];
        $scope.albums = [];
        $scope.user = null;
        $scope.username = $stateParams.username;
        $scope.currentPage = 1;
        $scope.totalPages = 0;
        $scope.url = '#';

        // Redirect to just /username if we're on /username/1
        if ($stateParams.page === 1) {
            $state.go('user', {username: $scope.username});
            return;
        }

        UserResource.get({username: $scope.username}, function(user) {
            $rootScope.title = '<i class="typ typ-user"></i> ' + user.username + "'s Images";
            $scope.user = user;
            $scope.albums = user.albums;
            $scope.url = '/user/' + user.username;
        });

        function loadPage(page) {
            $scope.currentPage = page;
            $rootScope.loading = true;
            UserResource.getImages({username: $scope.username, page: page}, function(data) {
                $rootScope.loading = false;
                $scope.images = data.images;
                $scope.totalPages = data.lastPage;
            });
        }

        $scope.changePage = function($event, page) {
            $event.stopPropagation();
	        $event.preventDefault();

            $state.go('user-page', {username: $scope.username, page: page}, {notify: false});
            loadPage(page);
        };

        loadPage($stateParams.page ? $stateParams.page : 1);
    }
);
