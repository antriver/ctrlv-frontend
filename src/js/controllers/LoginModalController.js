app.controller(
    'LoginModalController',
    function ($scope, close, AuthService) {

        $scope.username = '';
        $scope.password = '';

        $scope.login = function () {
            AuthService
                .login($scope.username, $scope.password)
                .then(
                    function (response) {
                        console.log("Aww yeah, hi", response.session, response.sessionKey)
                    },
                    function (error) {
                        console.log("poop", error);
                    }
                );
        };

        $scope.close = close;

    }
);
