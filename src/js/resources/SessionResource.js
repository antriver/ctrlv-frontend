app.factory(
    'SessionResource',
    [
        '$resource',
        function ($resource) {
            return $resource(
                apiUrl + 'sessions/:sessionKey',
                {},
                {
                    get: {
                        transformResponse: function(data) {
                            var data = angular.fromJson(data);
                            return data.session;
                        }
                    }
                }
            );
        }
    ]
);
