app.factory(
    'UserResource',
    [
        '$resource',
        function ($resource) {
            return $resource(
                apiUrl + 'users/:username',
                {},
                {
                    get: {
                        transformResponse: function(data) {
                            var data = angular.fromJson(data);
                            return data.user;
                        }
                    },

                    images: {
                        url: apiUrl + 'users/:username/images',
                        isArray: true,
                        transformResponse: function(data) {
                            var data = angular.fromJson(data);
                            return data.images;
                        }
                    }

                }
            );
        }
    ]
);
