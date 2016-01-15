app.controller(
    'AlbumController',
    function ($scope, $rootScope, $state, $compile, $stateParams, AuthService, AlbumResource) {

        console.log('AlbumController');

        $rootScope.loading = true;
        $rootScope.title = '';
        $rootScope.subtitle = '';

        $scope.images = [];
        $scope.albums = [];

        $scope.album = null;
        $scope.albumId = $stateParams.albumId;

        $scope.currentPage = 1;
        $scope.totalPages = 0;
        $scope.url = '/album/' + $scope.albumId;

        // Redirect to just /album if we're on /album/1
        if ($stateParams.page === 1) {
            $state.go('user', {albumId: $scope.albumId});
            return;
        }

        AlbumResource.get({albumId: $scope.albumId}, function(album) {
            console.log(album);

            $scope.album = album;
            $scope.albums = album.user.albums;

            $rootScope.title = '<i class="typ typ-folder-open"></i> ' + album.title;

            var subtitle = '<span>';
            if (album.user) {
                subtitle += '<i class="typ typ-user"></i> An Album By <a ui-sref="user({username: album.user.username.toLowerCase()})">' + album.user.username + '</a>';
            }
            subtitle += '</span>';
            $rootScope.subtitle = $compile(subtitle)($scope)[0].innerHTML;
        });

        function loadPage(page) {
            $scope.currentPage = page;
            $rootScope.loading = true;
            AlbumResource.getImages({albumId: $scope.albumId, page: page}, function(data) {
                $rootScope.loading = false;
                $scope.images = data.images;
                $scope.totalPages = data.lastPage;
            });
        }

        $scope.changePage = function($event, page) {
            $event.stopPropagation();
	        $event.preventDefault();

            $state.go('album-page', {albumId: $scope.albumId, page: page}, {notify: false});
            loadPage(page);
        };

        loadPage($stateParams.page ? $stateParams.page : 1);
    }
);
