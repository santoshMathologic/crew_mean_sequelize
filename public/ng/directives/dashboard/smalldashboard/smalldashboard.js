angular.module('matApp').directive('smallDashboard', ['$compile', function ($compiler) {
    return {
        restrict: 'E',
        templateUrl: 'ng/directives/dashboard/smalldashboard/smalldashboard.tmpl.html',
        controller: function ($scope, $state, $window, $location, $http, $resource) {

            



        }

    }
}]);