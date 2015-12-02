app.factory(
    'ImageResource',
    function ($resource) {
        return $resource(
            apiUrl + 'images/:imageId',
            {},
            {
                get: {
                    cache: true,
                    transformResponse: function(data) {
                        data = angular.fromJson(data);
                        return data.image;
                    }
                }

            }
        );
    }
);
