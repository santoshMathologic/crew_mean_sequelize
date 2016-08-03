angular.module('matApp').directive('pilot', ['$compile', function ($compiler) {
    return {
        restrict: 'E',
        templateUrl: 'ng/directives/dashboard/pilot/pilot.tmpl.html',
        controller: function ($scope, $state, $window, $location, $http, $resource, toaster) {

            $scope.pilotlists = [];
            $scope.Days = Days;
            $scope.timePattern = "([01]?[0-9]|2[0-3]):[0-5][0-9]";
            $scope.pilotTypeTrain = null;
            $scope.stations = [];
            $scope.name = null;
            $scope.fromStation = null;
            $scope.toStation = null;
            $scope.departureTime = "";
            $scope.arrivalTime = "";
            $scope.departureDay = "";
            $scope.arrivalDay = "";
            $scope.duration = null;
            $scope.distance = null;
            $scope.pilotTypes = [];
            $scope.selectedPilotType = { name: "" };
            $scope.selectedCssClass = 'selected-train-section';
            $scope.signOnDuration = 15;
            $scope.signOffDuration = 15;

            $scope.query = {

                sortBy: "name",
                limit: 10,
                page: 1

            }

            var apiUrl = "http://localhost:3000/api/v1/pilots";
            $scope.getPilotTypes = function () {
                $http.get(apiUrl, { params: $scope.query }).then(function (response) {
                    $scope.pilotTypes = response.data.results;
                    $scope.currentPage = response.data.current;
                    $scope.perPage = response.data.options.perPage;
                    $scope.totalPages = response.data.last;
                    $scope.totalRecords = response.data.count;


                }, function (error) {


                })

            }
            $scope.getPilotTypes();

            // new Code 
            $scope.isPilotTypeTrain = function () {
                if (!$scope.selectedPilotType)
                    return false;
                return $scope.selectedPilotType.name.search(/Train/i) != -1
            };

            $scope.trainSelected = function () {

            }
            $scope.trainSelected = function () {
                for (var i = 0; i < $scope.pilotTypes.length; i++) {
                    if ($scope.pilotTypes[i].name.search(/Train/i) != -1) {
                        $scope.selectedPilotType = $scope.pilotTypes[i];
                    }
                }

                $scope.fromStation = null;
                $scope.toStation = null;
                $scope.departureTime = "";
                $scope.arrivalTime = "";
                $scope.departureDay = "";
                $scope.arrivalDay = "";
            }
            $scope.othersSelected = function () {
                $scope.selectedPilotType = { name: "" };

                $scope.fromStation = null;
                $scope.toStation = null;
                $scope.departureTime = "";
                $scope.arrivalTime = "";
                $scope.departureDay = "";
                $scope.arrivalDay = "";
            }



        }

    }
}]);