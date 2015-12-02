app.controller(
    'HomeController',
    function ($scope, $timeout) {

        var sprites = [];
        for (var i = 0; i < 20; i++) {
            sprites.push('<span class="homesprite homesprite-' + i + '"></span>');
        }
        sprites.shuffle();
        $scope.sprites = sprites.join('');

        $scope.mac = navigator.platform === "MacIntel";

        $timeout(function() {
            $scope.test = true;
        }, 1000);
    }
);
