app.directive('paginator', function factory($window, $state, $timeout, debounce) {
    return {
        restrict: 'E',
        controller: function ($scope, $element) {

            $scope.showPageJump = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();

                var pageNumber  = prompt("Enter a page number to jump to.");
                if (pageNumber) {
                    window.location = $scope.url + '/' + pageNumber;
                }
            };

            var calculatePages = function () {

                console.log('calculatePages', $scope.currentPage, $scope.totalPages);

                // Only 1 page - don't need a paginator
                if ($scope.totalPages <= 1) {
                    return [1];
                }

                var pages = [];
                var i;
                var paginatorHeight = $element.height();

                // How tall is one link in the paginator
                var spaceHeight = 46;

                var totalSpaces = Math.floor(paginatorHeight / spaceHeight);

                console.log('paginatorHeight', paginatorHeight);
                console.log('totalSpaces', totalSpaces);

                // Round down to the next odd number
                if (totalSpaces % 2 === 0) {
                    totalSpaces -= 1;
                }

                // All page numbers fit on screen
                if ($scope.totalPages <= totalSpaces) {
                    for (i = 1; i <= $scope.totalPages; i++) {
                        pages.push(i);
                    }
                    return pages;
                }

                var adjacent = Math.floor((totalSpaces - 5) / 2);

                if ($scope.currentPage <= (adjacent + 3)) {
                    // Close to the start - don't hide first pages
                    for (i = 1; i <= totalSpaces - 2; i++) {
                        pages.push(i);
                    }
                    pages.push('...');
                    pages.push($scope.totalPages);

                } else if ($scope.currentPage >= $scope.totalPages - (adjacent) - 2) {
                    // Close to the end - don't hide last pages
                    pages = [1, '...'];
                    for (i = $scope.totalPages - (adjacent*2) - 2; i <= $scope.totalPages; i++) {
                        pages.push(i);
                    }

                } else {
                    pages = [1, '...'];
                    for (i = $scope.currentPage - adjacent; i <= $scope.currentPage + adjacent; i++) {
                        pages.push(i);
                    }
                    pages.push('...');
                    pages.push($scope.totalPages);
                }

                return pages;
            };

            $timeout(function() {
                $scope.pages = calculatePages();
            }, 50);

            // Recalculate on page change
            $scope.$watchGroup(['totalPages', 'currentPage'], function () {
                $timeout(function() {
                    $scope.pages = calculatePages();
                }, 50);
            });

            // Recalculate on window resize
            var debouncedCalculatePages = debounce(100, function() {
                $scope.pages = calculatePages();
            });
            angular.element($window).bind('resize', function() {
                debouncedCalculatePages();
            });

        },
        scope: {
            currentPage: '=',
            totalPages: '=',
            url: '=',
            changePage: '=',
        },
        templateUrl: 'views/partials/paginator.html'
    };
});
