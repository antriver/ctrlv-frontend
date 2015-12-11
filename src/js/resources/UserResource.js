app.factory(
    'UserResource',
    function ($resource, AuthService) {
        return $resource(
            apiUrl + 'users/:username',
            {
                username: '@username',
                sessionKey: function() {
                    return AuthService.getSessionKey() || null;
                }
            },
            {
                get: {
                    cache: true,
                    transformResponse: function(data) {
                        var data = angular.fromJson(data);
                        return data.user;
                    }
                },

                save: {
                    method: 'POST',
                    url: apiUrl + 'users'
                },

                getImages: {
                    cache: true,
                    url: apiUrl + 'users/:username/images?page=:page',
                    /*isArray: true,
                    transformResponse: function(data) {
                        var data = angular.fromJson(data);
                        return data.images;
                    }*/
                },

                getAlbums: {
                    cache: true,
                    url: apiUrl + 'users/:username/albums',
                    /*isArray: true,
                    transformResponse: function(data) {
                        var data = angular.fromJson(data);
                        return data;
                    }*/
                }
            }
        );
    }
);
