angular.module('matApp').directive('train', ['$compile', function ($compiler) {
    return {
        restrict: 'E',
        templateUrl: 'ng/directives/dashboard/train/train.tmpl.html',
        controller: function ($scope, $state, $window, $location, $http) {

            $scope.trainsList = [];
            $scope.Days = Days;
            $scope.typeLists = [];
            $scope.traindetails = {};
            $scope.query = {
                sortBy: 'train_No',
                limit: 10,
                page: 1,

            };
            var apiTrain = "http://localhost:3000/api/v1/train_details"

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

            $scope.gettrainType = function () {
                var typeuri = "http://localhost:3000/api/v1/trainTypes";
                $http.get(typeuri).then(function (response) {

                    $scope.typeLists = response.data.results;
                })
            }

            $scope.gettrainType();

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

            $scope.changeTrainFromUser = function (train) {
                console.log("" + train);

            }
            $scope.updateDeselectAll = function () {


            }
            $scope.updateSelectAll = function () {

            }

            $scope.saveTrain = function (traindetails) {


            }

            $scope.getStation = function (searchQuery, timeout) {
                return $http.get("http://localhost:3000/api/v1/stations/stationsByQuery/" + searchQuery);

            }

            $scope.fromStationSelected = function (selected) {
                if (selected) {
                    if (!$scope.traindetails) {
                        $scope.traindetails = {};
                    }
                    $scope.traindetails.fromStation = selected.originalObject;
                }
            }

            /**   
             * The toStationSelected  function is used to select the tostation from DB   
            */
            $scope.toStationSelected = function (selected) {
                if (selected) {
                    if (!$scope.traindetails) {
                        $scope.traindetails = {};
                    }
                    $scope.traindetails.toStation = selected.originalObject;
                }
            }





        }
    }
}]);