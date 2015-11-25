app.factory(
    'ImageResource',
    [
        '$resource',
        function ($resource) {
            return $resource(
                apiUrl + 'images/:id',
                {},
                {
                    get: {
                        transformResponse: function(data) {
                            var data = angular.fromJson(data);
                            return data.image;
                        }
                    }

                }
            );
        }
    ]
);
