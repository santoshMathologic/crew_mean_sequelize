angular.module('matApp')
    .directive('customHeader', ['$compile', function ($compile) {
        return {
            restrict: 'E',
            templateUrl: 'ng/directives/dashboard/header/header.tmpl.html',
            controller: function ($scope, $state, $http, $log, $q, $timeout, $window, AuthFactory) {


                $scope.logout = function () {
                    AuthFactory.logout();
                    $timeout(function () {
                        $state.go('home.login', {}, { reload: true });
                        console.log('update with timeout fired')
                    }, 100);

                }


            }

        };
    }]);