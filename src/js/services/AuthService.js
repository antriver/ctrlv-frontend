app.service(
    'AuthService',
    function (localStorageService, SessionResource, $q, $rootScope) {

        var session = null;
        var sessionKey = null;

        return {

            checkSession: function() {
                var self = this;

                if (sessionKey = localStorageService.get('sessionKey')) {
                    SessionResource.get(
                        {sessionKey: sessionKey},
                        function (session) {
                            self.onLogin(session, sessionKey);
                        },
                        function() {
                            self.onLogout();
                        }
                    );
                } else {
                    self.onLogout();
                }
            },

            /**
             * @param username
             * @param password
             * @returns $q
             */
            login: function(username, password) {
                var self = this;

                return $q(function(resolve, reject) {

                    SessionResource.save({
                        username: username,
                        password: password
                    }, function(response) {

                        self.onLogin(response.session, response.sessionKey);

                        // Resolve promise (sends back user)
                        resolve(response.session.user);

                    }, function (response) {
                        reject(response.data);
                    });

                });
            },

            onLogin: function(newSession, newSessionKey) {

                session = newSession;
                sessionKey = newSessionKey;
                localStorageService.set('sessionKey', newSessionKey);

                // Tell everybody we're logged in
                $rootScope.$broadcast('login', {user: newSession.user});

            },

            logout: function() {
                var self = this;

                SessionResource.delete({
                    sessionKey: sessionKey
                });

                self.onLogout();

            },

            onLogout: function() {

                session = false;
                sessionKey = false;
                localStorageService.remove('sessionKey');

                // Tell everybody we're logged in
                $rootScope.$broadcast('logout');

            },

            getSessionKey: function() {
                return sessionKey;
            },

            getUser: function() {
                if (session === null) {
                    return null;
                }

                return session && session.user ? session.user : false;
            }
        };
    }
);
