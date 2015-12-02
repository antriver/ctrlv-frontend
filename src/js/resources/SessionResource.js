app.factory(
    'SessionResource',
    function ($resource) {
        return $resource(
            apiUrl + 'sessions/:sessionKey',
            {},
            {
                get: {
                    transformResponse: function(data) {
                        data = angular.fromJson(data);
                        return data.session;
                    }
                }
            }
        );
    }
);
