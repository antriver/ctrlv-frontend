/**
 * Source: http://stackoverflow.com/a/32574746/710630
 */
(function () {
    'use strict';

    app.directive(
        'stateBodyClass',
        function ($rootScope) {
            return {
                restrict: 'A',
                scope: {},
                link: function (scope, elem, attr, ctrl) {

                    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                        var fromClassnames = angular.isDefined(fromState.data) && angular.isDefined(fromState.data.bodyClass) ? fromState.data.bodyClass : null;
                        var toClassnames = angular.isDefined(toState.data) && angular.isDefined(toState.data.bodyClass) ? toState.data.bodyClass : null;

                        // don't do anything if they are the same
                        if (fromClassnames != toClassnames) {
                            if (fromClassnames) {
                                elem.removeClass(fromClassnames);
                            }

                            if (toClassnames) {
                                elem.addClass(toClassnames);
                            }
                        }
                    });
                }
            };
        }
    );

}());
