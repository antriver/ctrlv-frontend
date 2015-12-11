app.factory(
    'AlbumResource',
    function ($resource, AuthService) {
        return $resource(
            apiUrl + 'albums/:albumId',
            {
                albumId: '@albumId',
                sessionKey: function() {
                    return AuthService.getSessionKey() || null;
                }
            },
            {
                get: {
                    cache: true,
                    transformResponse: function(data) {
                        data = angular.fromJson(data);
                        return data.image;
                    }
                },

                getImages: {
                    cache: true,
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
