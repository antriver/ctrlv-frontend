app.controller(
    'ImageController',
    function ($scope, $rootScope, $stateParams, ImageResource, AlbumResource) {

        console.log('begin image controller!');

        console.log($scope, $rootScope);

        $scope.loading = true;
        $scope.imageOrientation = 'l';
        $scope.imageId = $stateParams.imageId;
        $scope.albumImages = [];

        ImageResource.get({imageId: $stateParams.imageId}, function(image) {
            console.log('loaded');
            $scope.loading = false;
            $scope.image = image;
            $rootScope.title = image.title;

            if (image.albumId) {
                // Get the images in the album to show on the left
                AlbumResource.getImages({albumId: image.albumId}, function(images) {
                    $scope.albumImages = images;
                    console.log($scope.albumImages);
                });
            }

            if (image.image) {
                if ($scope.image.image.height > $scope.image.image.width) {
                    $scope.imageOrientation = 'h';
                }
            }

        });

        console.log('image controller!');
    }
);
