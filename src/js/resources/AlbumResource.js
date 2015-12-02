app.factory(
    'AlbumResource',
    function ($resource) {
        return $resource(
            apiUrl + 'albums/:albumId',
            {},
            {
                get: {
                    cache: true,
                    transformResponse: function(data) {
                        data = angular.fromJson(data);
                        return data.image;
                    }
                },

                getImages: {
                    url: apiUrl + 'albums/:albumId/images',
                    isArray: true,
                    transformResponse: function(data) {
                        var data = angular.fromJson(data);
                        return data.images;
                    }
                }

            }
        );
    }
);
