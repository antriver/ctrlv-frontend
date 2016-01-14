app.directive('annotator', function ($window, debounce) {
    return {
        restrict: 'E',
        controller: function ($scope, $element) {

            console.log($scope.doodle);
            var imageEl = $('#img');

            $scope.doodle = new Doodle($element[0]);
            $scope.doodle.init();

            var moveAndResize = function() {
                var imgOffset = imageEl.offset();
                $element.css({
                    left: imgOffset.left + 1,
                    top: imgOffset.top + 1,
                });
                $scope.doodle.canvas.width = imageEl.width();
                $scope.doodle.canvas.height = imageEl.height();
            };

            moveAndResize();

            var debouncedRedraw = debounce(200, function() {
                console.log('debouncedRedraw');
                $scope.doodle.redraw();
            });

            angular.element($window).bind('resize', function() {
                console.log('resize');
                moveAndResize();
                debouncedRedraw();
            });

        },
        scope: {
            doodle: '=',
        },
        template: ''
    };
});
