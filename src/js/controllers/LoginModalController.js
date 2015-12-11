app.controller(
    'LoginModalController',
    function ($scope, close, AuthService, UserResource) {

        $scope.loginData = {
            loading: false,
            username: '',
            password: '',
            errors: {}
        };

        $scope.signupData = {
            loading: false,
            username: '',
            password: '',
            email: '',
            errors: {}
        };

        $scope.fb = function () {
            alert(':(');
        };

        $scope.forgot = function () {
            alert('lol');
        };

        $scope.login = function () {
            if ($scope.loginData.loading) {
                return false;
            }
            $scope.loginData.errors = {};
            $scope.loginData.loading = true;

            AuthService
                .login($scope.loginData.username, $scope.loginData.password)
                .then(
                    function (response) {
                        $scope.loginData.loading = false;

                        close();
                    },
                    function (response) {
                        $scope.loginData.loading = false;

                        if (
                            response.messages
                            &&
                            (
                                response.messages.hasOwnProperty('username')
                                ||
                                response.messages.hasOwnProperty('password')
                            )
                        ) {
                            $scope.loginData.errors = response.messages;
                        } else {

                            $scope.loginData.errors = {
                                general: response.message
                            };
                        }

                    }
                );
        };


        $scope.signup = function () {
            if ($scope.signupData.loading) {
                return false;
            }
            $scope.signupData.errors = {};
            $scope.signupData.loading = true;

            UserResource.save({
                username: $scope.signupData.username,
                password: $scope.signupData.password,
                email: $scope.signupData.email,
            }, function(response) {

                AuthService
                    .login($scope.signupData.username, $scope.signupData.password)
                    .then(
                        function (response) {
                            $scope.signupData.loading = false;
                            close();
                        },
                        function (response) {
                            $scope.signupData.loading = false;
                            $scope.signupData.errors = {
                                general: response.message
                            };
                        }
                    );

            }, function (response) {
                $scope.signupData.loading = false;

                response = response.data;
                if (
                    response.messages
                    &&
                    (
                        response.messages.hasOwnProperty('username')
                        ||
                        response.messages.hasOwnProperty('password')
                        ||
                        response.messages.hasOwnProperty('email')
                    )
                ) {
                    $scope.signupData.errors = response.messages;
                } else {

                    $scope.signupData.errors = {
                        general: response.message
                    };
                }
            });
        };

        $scope.close = close;

    }
);
