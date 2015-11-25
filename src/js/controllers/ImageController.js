app.controller(
    'ImageController',
    [
        '$scope',
        '$rootScope',
        '$stateParams',
        'ImageResource',
        function ($scope, $rootScope, $stateParams, ImageResource) {

            console.log($scope, $rootScope);
            $scope.imageId = $stateParams.imageId;

            $scope.image = ImageResource.get({id: $stateParams.imageId});

            console.log('image controller!');

        }
    ]
);
