app.controller(
    'ImageListController',
    function ($scope, $rootScope, $state, $stateParams, $compile, AuthService, AlbumResource, UserResource) {

        console.log('ImageListController');

        $rootScope.loading = true;
        $rootScope.title = '';
        $rootScope.subtitle = '';

        $scope.mode = $stateParams.mode;


        /**
         * Load the user
         */

        $scope.user = null;
        $scope.username = $stateParams.username;

        $scope.album = null;
        $scope.albumId = $stateParams.albumId;

        $scope.albums = [];


        function loadAlbum(albumId) {
            AlbumResource.get({albumId: albumId}, function (album) {
                console.log(album);

                $scope.album = album;
                $scope.user = album.user;
                $scope.albumId = albumId;
                $scope.albums = album.user.albums;

                $rootScope.title = '<i class="typ typ-folder-open"></i> ' + album.title;

                var subtitle = '<span>';
                if (album.user) {
                    subtitle += '<i class="typ typ-user"></i> An Album By <a ng-click="changeUser($event, album.user.username)" ui-sref="user({username: album.user.username.toLowerCase()})">' + album.user.username + '</a>';
                }
                subtitle += '</span>';
                $rootScope.subtitle = $compile(subtitle)($scope)[0].innerHTML;
            });
        }

        $scope.changeAlbum = function ($event, albumId) {
            $event.stopPropagation();
            $event.preventDefault();

            $scope.mode = 'album';
            $scope.albumId = albumId;
            $state.go('album', {albumId: albumId}, {notify: false});
            loadAlbum(albumId);
            loadImages(1);
        };

        function loadUser(username) {
            $scope.username = username;
            UserResource.get({username: username}, function (user) {
                $rootScope.title = '<i class="typ typ-user"></i> ' + user.username + "'s Images";
                $scope.user = user;
                $scope.albums = user.albums;
                $scope.url = '/user/' + user.username;
            });
        }

        $scope.changeUser = function ($event, username) {
            $event.stopPropagation();
            $event.preventDefault();

            $scope.mode = 'user';
            $scope.username = username;
            $state.go('user', {username: username}, {notify: false});
            loadUser(username);
            loadImages(1);
        };

        // On pageload
        switch ($scope.mode) {
            case 'album':
                loadAlbum($scope.albumId);
                break;
            case 'user':
                loadUser($scope.username);
                break;
        }



        /**
         * Load the page of images
         */

        $scope.images = [];
        $scope.currentPage = 1;
        $scope.totalPages = 0;

        function loadImages(page) {
            $rootScope.loading = true;

            switch ($scope.mode) {
                case 'album':
                    AlbumResource.getImages({albumId: $scope.albumId, page: page}, imagesLoadedCallback);
                    break;
                case 'user':
                    UserResource.getImages({username: $scope.username, page: page}, imagesLoadedCallback);
                    break;
            }
        }

        function imagesLoadedCallback(data) {
            $rootScope.loading = false;
            $scope.images = data.images;
            $scope.totalPages = data.lastPage;
            $scope.currentPage = data.currentPage;
        }

        $scope.changePage = function ($event, page) {
            $event.stopPropagation();
            $event.preventDefault();

            switch ($scope.mode) {
                case 'album':
                    $state.go('album-page', {albumId: $scope.albumId, page: page}, {notify: false});
                    break;

                case 'user':
                    $state.go('user-page', {username: $scope.username, page: page}, {notify: false});
                    break;
            }

            loadImages(page);
        };

        loadImages($stateParams.page ? $stateParams.page : 1);
    }
);
