angular.module('matApp')
    .directive('dashboard', ['$compile', function($compile) {
        return {
            restrict: 'E',
            scope: {
                dashboard: '='
            },
            templateUrl: 'ng/directives/dashboard/dashboard.tmpl.html',
            controller: function($scope, $state, $http, $log, $q, $timeout, $window) {
                
                $scope.title = "In Dashboard";
                

               
            }

        };
    }]);