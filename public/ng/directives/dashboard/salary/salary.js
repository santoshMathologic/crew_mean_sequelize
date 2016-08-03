angular.module('matApp').directive('salary', ['$compile', function ($compiler) {
    return {
        restrict: 'E',
        templateUrl: 'ng/directives/dashboard/salary/salary.tmpl.html',
        controller: function ($scope, $state, $window, $location, $http, $resource) {

            $scope.salarieslist = [];
            $scope.query = {

                sortBy: "employeeName",
                limit: 10,
                page: 1

            }

            var apiUrl = "http://localhost:3000/api/v1/salary";
            $scope.getSalary = function () {
                $http.get(apiUrl, { params: $scope.query }).then(function (response) {
                    $scope.salarieslist = response.data.results;
                    $scope.currentPage = response.data.current;
                    $scope.perPage = response.data.options.perPage;
                    $scope.totalPages = response.data.last;
                    $scope.totalRecords = response.data.count;


                }, function (error) {


                })

            }
            $scope.getSalary();


        }

    }
}]);