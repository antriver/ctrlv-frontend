app.factory(
    'ImageResource',
    function ($resource, AuthService) {
        return $resource(
            apiUrl + 'images/:imageId',
            {
                imageId: '@imageId',
                sessionKey: function() {
                    return AuthService.getSessionKey() || null;
                }
            },
            {
                get: {
                    cache: true,
                },

                update: {
                    method: 'PUT'
                },

                getText: {
                    url: apiUrl + 'images/:imageId/text',
                    method: 'GET'
                },

                annotate: {
                    url: apiUrl + 'images/:imageId/image',
                    method: 'PUT',
                    params: {
                        action: 'annotate'
                    }
                },

                crop: {
                    url: apiUrl + 'images/:imageId/image',
                    method: 'PUT',
                    params: {
                        action: 'crop'
                    }
                },

                revert: {
                    url: apiUrl + 'images/:imageId/image',
                    method: 'PUT',
                    params: {
                        action: 'revert'
                    }
                },

                rotate: {
                    url: apiUrl + 'images/:imageId/image',
                    method: 'PUT',
                    params: {
                        action: 'rotate',
                        degrees: 90
                    }
                },
            }
        );
    }
);
