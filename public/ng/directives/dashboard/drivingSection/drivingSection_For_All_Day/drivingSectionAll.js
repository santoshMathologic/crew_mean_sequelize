angular.module('matApp').directive('drivingSectionAll', ['$compile', function ($compiler) {
    return {
        restrict: 'E',
        templateUrl: 'ng/directives/dashboard/drivingSection/drivingSection_For_All_Day/drivingSectionAll.tmpl.html',
        controller: function ($scope, $filter, $state, $log, $q, $window, $location, $http, toaster, $confirm, $timeout, $resource) {

            $scope.trainsList = [];
            $scope.trainstation = [];
            $scope.selectedTrainStations = {};

            $scope.Days = Days;
            $scope.trainTypes = trainTypes;
            $scope.trainNo = ($state.params.trainNo) ? $state.params.trainNo : 0;
            $scope.startDay = ($state.params.startDay) ? $state.params.startDay : '';

            $scope.refreshDrivingSection = true;


            $scope.itemsPerPage = 200;

            $scope.selectedTrain = {
                trainNo: $scope.trainNo,
                startDay: $scope.startDay
            };
            $scope.selectedCssClass = 'selected-train-section';

            $scope.getters = {
                trainNo: function (value) {
                    //this will sort by the length of the first name string
                    return value.trainNo.length;
                }
            }

            $scope.query = {
                sortBy: 'trainNo',
                limit: 10,
                page: 1,

            };
            var apiTrain = "http://localhost:3000/api/v1/trains"

            $scope.getTrainList = function () {
                $http.get(apiTrain, { params: $scope.query })
                    .then(function (response) {
                        $scope.trainsList = response.data.results;
                        $scope.currentPage = response.data.current;
                        $scope.perPage = response.data.options.perPage;
                        $scope.totalPages = response.data.last;
                        $scope.totalRecords = response.data.count;
                    });
            }



            $scope.getTrainList();

            $scope.$watch('query', function (newValue, oldValue) {
                if (!oldValue) {
                    bookmark = $scope.query.page;
                }

                if (newValue !== oldValue) {
                    $scope.query.page = newValue.page;
                }

                if (!newValue) {
                    $scope.query.page = bookmark;
                }

                $scope.getTrainList();
            }, true);


            $scope.updateTrainStationsUrl = function () {
                if ($scope.selectedTrain.trainNo == 0
                    || $scope.selectedTrain.startDay == '') {
                    return '';
                }
                return "http://localhost:3000/api/v1/trainstations/search_trainNo_and_startDay";
            }

            $scope.getstation = function () {
                $scope.query1 = {
                    sortBy: 'stopNumber',
                    limit: 50,
                    page: 1,
                    trainNo: $scope.selectedTrain.trainNo,
                    startDay: $scope.selectedTrain.startDay

                }
                $http.get($scope.updateTrainStationsUrl(), { params: $scope.query1 }).then(function (response) {
                    $scope.trainstation = response.data.results;
                    $scope.currentPage = response.data.current;
                    $scope.perPage = response.data.options.perPage;
                    $scope.totalPages = response.data.last;
                    $scope.totalRecords = response.data.count;

                    for (var i = 0; i < $scope.trainstation.length; i++) {
                        if ($scope.trainstation[i].arrivalTime == '0:00') {
                            $scope.addTrainStationSelectedList(i+1, null);
                        }
                        if ($scope.trainstation[i].departureTime == '0:00') {
                            $scope.addTrainStationSelectedList($scope.trainstation.length, null);
                        }

                    }

                }, function (error) {

                });

            }

            $scope.getTrainTimeTable = function (trainItem) {
                if ($scope.selectedTrain.trainNo != trainItem.trainNo || $scope.selectedTrain.startDay != trainItem.runningDays[0]) {
                    $scope.selectedTrain = {
                        trainNo: trainItem.trainNo,
                        startDay: Days[trainItem.runningDays[0]],
                        cssClass: $scope.selectedCssClass
                    };
                    $scope.getstation();
                }



            }
            $scope.getSelectedTrainCss = function (trainItem) {
                if ($scope.selectedTrain.trainNo == trainItem.trainNo
                    && $scope.selectedTrain.startDay == Days[trainItem.runningDays[0]]) {
                    //  $scope.refreshDrivingSection = ($scope.refreshDrivingSection) ? false : true;
                    //  $scope.getTrainList();
                    return $scope.selectedTrain.cssClass;
                }
                return "";

            }

            $scope.addTrainStationSelectedList = function (stopNumber, stationdata) {
                $scope.selectedTrainStations[stopNumber] = {
                    data: stationdata,
                    cssClass: $scope.selectedCssClass
                };
            };
            $scope.removeTrainStationSelectedList = function (stopNumber) {
                delete $scope.selectedTrainStations[stopNumber];
            };

            $scope.rowClicked = function (stopNumber, data) {

                if (stopNumber == 1
                    || stopNumber == $scope.trainstation.length) {
                    toaster
                        .pop({
                            type: 'error',
                            title: 'Error',
                            body: 'You cannot unselect first and last stations.'
                        });
                    return;
                } else {

                    if ($scope.selectedTrainStations[stopNumber] && $scope.selectedTrainStations[stopNumber].cssClass) {
                        $scope.removeTrainStationSelectedList(stopNumber);
                    } else {
                        $scope.addTrainStationSelectedList(stopNumber, data);
                    }
                }


            }

        }

    }
}]);