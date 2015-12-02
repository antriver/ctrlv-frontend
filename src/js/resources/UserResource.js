app.factory(
    'UserResource',
    function ($resource) {
        return $resource(
            apiUrl + 'users/:username',
            {},
            {
                get: {
                    cache: true,
                    transformResponse: function(data) {
                        var data = angular.fromJson(data);
                        return data.user;
                    }
                },

                getImages: {
                    cache: true,
                    url: apiUrl + 'users/:username/images',
                    isArray: true,
                    transformResponse: function(data) {
                        var data = angular.fromJson(data);
                        return data.images;
                    }
                },

                getAlbums: {
                    cache: true,
                    url: apiUrl + 'users/:username/albums',
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
