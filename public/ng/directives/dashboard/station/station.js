angular.module('matApp').directive('station', ['$compile', function ($compiler) {
    return {
        restrict: 'E',
        templateUrl: 'ng/directives/dashboard/station/station.tmpl.html',
        controller: function ($scope, $state, $window, $anchorScroll, $timeout, $location, $http, $resource, toaster) {

            $scope.Days = Days;
            $scope.stationsList = [];
            $scope.stationdetails = {};
            $scope.blanktraindetails = {};

            $scope.query = {
                sortBy: 'stationCode',
                limit: 10,
                page: 1,

            };
            var apiStations = "http://localhost:3000/api/v1/stations"

            $scope.getStation = function () {
                $http.get(apiStations, { params: $scope.query })
                    .then(function (response) {
                        $scope.stationsList = response.data.results;
                        $scope.currentPage = response.data.current;
                        $scope.perPage = response.data.options.perPage;
                        $scope.totalPages = response.data.last;
                        $scope.totalRecords = response.data.count;
                    });
            }


            $scope.getStation();

            $scope.saveStation = function (stationdetails) {
                var apiStationsUri = "http://localhost:3000/api/v1/stations"
                $http.post(apiStationsUri, stationdetails).then(function (response) {
                    if (response.data.status == 200) {
                        toaster
                            .pop({
                                type: 'success',
                                title: 'Station saved Succcessfully',
                                body: 'Station saved Succcessfully.'
                            });

                    }
                })

            }

            $scope.removeStation = function (station) {
                $timeout(function () {
                    var index = $scope.stationsList.indexOf(station);
                    $scope.stationsList.splice(index, 1);
                    toaster
                        .pop({
                            type: 'success',
                            title: 'Station Removed Succcessfully',
                            body: 'Station Removed Succcessfully.'
                        });


                }, 1000);


            }
            $scope.updateStation = function (station) {


            }

            $scope.reset = function () {
                $scope.stationdetails = angular.copy($scope.blanktraindetails);
                $scope.clearInput();
                $scope.submitClass = "hide-errors";

            };
            $scope.$watch('stationdetails', function (c) {
                $location.hash('stationFormDiv');
                $anchorScroll();
		          });

        }

    }
}]);