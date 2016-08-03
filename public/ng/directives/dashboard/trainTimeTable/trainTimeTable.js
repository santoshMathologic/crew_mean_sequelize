angular.module('matApp').directive('trainTime', ['$compile', function ($compiler) {
    return {
        restrict: 'E',
        templateUrl: 'ng/directives/dashboard/trainTimeTable/trainTimeTable.tmpl.html',
        controller: function ($scope, $state, $window, $location, $http, $resource) {

            $scope.Days = Days;
            $scope.trainNo = ($state.params.trainNo) ? $state.params.trainNo : '';
            $scope.startDay = ($state.params.startDay) ? $state.params.startDay : '';
            $scope.trainStationList = [];
            console.log($scope.trainNo)
            console.log($scope.startDay);

            $scope.query = {
                sortBy: 'trainNo',
                limit: 30,
                page: 1,
                trainNo:$scope.trainNo,
                startDay:$scope.startDay

            };
            var apitimetable = "http://localhost:3000/api/v1/trainstations"

            $scope.getTimeTable = function () {
                $http.get(apitimetable, { params: $scope.query })
                    .then(function (response) {
                        $scope.trainStationList  = response.data.results;
                        $scope.currentPage = response.data.current;
                        $scope.perPage = response.data.options.perPage;
                        $scope.totalPages = response.data.last;
                        $scope.totalRecords = response.data.count;
                    });
            }


            $scope.getTimeTable();



        }

    }
}]);