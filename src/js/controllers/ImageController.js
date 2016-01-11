app.controller(
    'ImageController',
    function ($scope, $rootScope, $state, $stateParams, $compile, AuthService, ImageResource, AlbumResource, ModalService) {

        $scope.albumId = null;
        $scope.albumImages = [];
        $scope.image = null;
        $scope.imageId = $stateParams.imageId;
        $scope.editing = false;

        $rootScope.loading = true;
        $rootScope.title = '';
        $rootScope.subtitle = '';

        $scope.init = function () {

            if ($stateParams.albumId) {
                $scope.loadAlbumImages($stateParams.albumId);
            }

            ImageResource.get({imageId: $stateParams.imageId}, function (response) {
                $scope.image = response.image;
                $rootScope.loading = false;

                // TODO: If the image is passworded show login prompt
                // Show errors
                // If anon or passworded, refresh on logout

                var title = '';
                if ($scope.image.title) {
                    title = $scope.image.title;
                } else {
                    title = 'Image #' + $scope.image.imageId;
                }
                $rootScope.title = title;

                var subtitle = '<span>';
                if ($scope.image.userId) {
                    subtitle += '<i class="typ typ-user"></i> By <a ui-sref="user({username: image.user.username.toLowerCase()})">' + $scope.image.user.username + '</a>';
                }
                subtitle += '<i class="typ typ-time"></i> <span title="' + moment($scope.image.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a") + '">' + moment($scope.image.createdAt).fromNow() + '</span>';

                if ($scope.image.album) {
                    subtitle += '<i class="typ typ-folder-open"></i> In <a ui-sref="album({albumId: image.album.albumId})">' + $scope.image.album.title + '</a>';
                }
                subtitle += '</span>';

                console.log($compile(subtitle)($scope));
                $rootScope.subtitle = $compile(subtitle)($scope)[0].innerHTML;

                if ($scope.image.albumId && $scope.image.albumId !== $scope.albumId) {
                    $scope.loadAlbumImages($scope.image.albumId);
                }
            });
        };

        $scope.loadAlbumImages = function (albumId) {
            $scope.albumId = albumId;
            // Get the images in the album to show on the left
            AlbumResource.getImages({albumId: albumId}, function (images) {
                $scope.albumImages = images;
            });
        };

        /**
         * Sidebar Buttons
         */

        $scope.showTextDialog = function () {
            ModalService.showModal({
                templateUrl: 'views/modals/image-text.html',
                controller: function ($scope, close, image) {
                    $scope.image = image;
                    $scope.text = ImageResource.getText({imageId: image.imageId});
                    $scope.close = close;
                },
                inputs: {
                    image: $scope.image
                }
            });
        };

        $scope.showEmbedDialog = function () {
            ModalService.showModal({
                templateUrl: 'views/modals/image-embed.html',
                controller: function ($scope, close, image) {
                    $scope.image = image;
                    $scope.close = close;
                },
                inputs: {
                    image: $scope.image
                }
            });
        };

        $scope.shareOnFb = function () {
            var url = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent($scope.image.url);
            window.open(url);
        };

        $scope.shareOnTwitter = function () {
            var url = 'https://twitter.com/home?status=' + encodeURIComponent($scope.image.url);
            window.open(url);
        };

        $scope.annotate = function () {

        };

        $scope.cropCoords = null;
        $scope.cropping = false;
        $scope.savingCrop = false;
        $scope.jcrop = null;

        $scope.crop = function () {
            if ($scope.editing) {
                return false;
            }
            $scope.cropping = true;
            $scope.jcrop = $.Jcrop('#img', {
                onChange: function (c) {
                    console.log(c);
                    $scope.cropCoords = c;
                }
            });
        };

        $scope.saveCrop = function () {

            // How much is the image scaled on screen
            var scale = $scope.getImageScale();

            var params = {
                imageId: $scope.imageId,
                width: Math.round($scope.cropCoords.w / scale),
                height: Math.round($scope.cropCoords.h / scale),
                x: Math.round($scope.cropCoords.x / scale),
                y: Math.round($scope.cropCoords.y / scale),
            };
            $scope.savingCrop = true;
            ImageResource.crop(
                params,
                function (response) {
                    $scope.exitCrop();
                    $scope.image = response.image;
                },
                function (response) {
                    $scope.savingCrop = false;
                    alert(response.data.message);
                }
            );
        };

        $scope.exitCrop = function () {
            $scope.jcrop.destroy();
            $scope.cropCoords = null;
            $scope.cropping = false;
            $scope.jcrop = null;
            $scope.savingCrop = false;
            // Undo what jcrop did
            $('#img').css({width: '', height: ''});
        };

        $scope.rotate = function () {
            if ($scope.editing) {
                return false;
            }
            $scope.editing = true;
            $scope.rotating = true;
            ImageResource.rotate(
                {
                    imageId: $scope.image.imageId
                },
                function (response) {
                    $scope.editing = false;
                    $scope.rotating = false;
                    $scope.image = response.image;
                },
                function (response) {
                    $scope.editing = false;
                    $scope.rotating = false;
                    alert(response.data.message);
                }
            );
        };

        $scope.revert = function () {
            if ($scope.editing) {
                return false;
            }

            if (!confirm("This will undo and cropping and remove any annotation. Are you sure you want to do this?")) {
                return false;
            }

            $scope.editing = true;
            $scope.reverting = true;
            ImageResource.revert(
                {
                    imageId: $scope.image.imageId
                },
                function (response) {
                    $scope.editing = false;
                    $scope.reverting = false;
                    $scope.image = response.image;
                },
                function (response) {
                    $scope.editing = false;
                    $scope.reverting = false;
                    alert(response.data.message);
                }
            );
        };

        $scope.showPrivacyDialog = function () {
            ModalService.showModal({
                templateUrl: 'views/modals/image-privacy.html',
                controller: function ($scope, close, image) {
                    $scope.image = image;
                    $scope.close = close;

                    $scope.setAnon = function (anon) {
                        ImageResource.update({'imageId': $scope.image.imageId},
                        {
                            anonymous:anon
                        }, function(res)
                        {
                            console.log(res);
                            $scope.image = res.image;
                            $scope.$parent.image = res.image;
                        });
                    };

                    $scope.setPassword = function () {

                    };

                },
                inputs: {
                    image: $scope.image
                }
            });
        };

        $scope.delete = function () {
            if ($scope.editing) {
                return false;
            }

            if (!confirm("Are you sure you want to delete this image?")) {
                return false;
            }

            $scope.editing = true;
            $scope.deleting = true;
            ImageResource.delete(
                {
                    imageId: $scope.image.imageId
                },
                function () {
                    $scope.editing = false;
                    $scope.deleting = false;
                    $scope.image = null;
                },
                function (response) {
                    $scope.editing = false;
                    $scope.deleting = false;
                    alert(response.data.message);
                }
            );
        };

        $scope.showReportDialog = function () {

        };

        /**
         * Returns how much the image is scaled to fit on the screen.
         */
        $scope.getImageScale = function () {
            return parseInt($('#img').width()) / $scope.image.image.width;
        };

        $scope.init();
    }
);
