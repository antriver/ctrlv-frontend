app.directive('paginator', function factory() {
    return {
        restrict: 'E',
        controller: function ($scope) {
            console.log('$scope', $scope);
        },
        scope: {
            currentPage: '=',
            totalPages: '='
        },
        templateUrl: 'views/partials/paginator.html'
    };
});
