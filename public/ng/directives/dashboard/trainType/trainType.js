angular.module('matApp').directive('trainType', ['$compile', function ($compiler) {
    return {
        restrict: 'E',
        templateUrl: 'ng/directives/dashboard/trainType/trainType.tmpl.html',
        controller: function ($scope, $anchorScroll,$timeout, $state, $window, $location, $http, $resource, toaster) {

            $scope.Days = Days;
            $scope.trainTypesList = [];
            $scope.blanktrainTypedetails = {}; // the blank object is used to reset the form
            $scope.traintypedetails = {};

            if (!$scope.trainTypedetails)
                $scope.trainTypedetails = {};
            $scope.submitClass = 'show-errors';

            $scope.query = {
                sortBy: 'name',
                limit: 10,
                page: 1,

            };
            var apiTypes = "http://localhost:3000/api/v1/trainTypes"

            $scope.getType = function () {
                $http.get(apiTypes, { params: $scope.query })
                    .then(function (response) {
                        $scope.trainTypesList = response.data.results;
                        $scope.currentPage = response.data.current;
                        $scope.perPage = response.data.options.perPage;
                        $scope.totalPages = response.data.last;
                        $scope.totalRecords = response.data.count;
                    });
            }


            $scope.getType();

            $scope.saveTrainType = function (trainType) {
                var TTypeUri = "http://localhost:3000/api/v1/trainTypes"
                $http.post(TTypeUri, trainType).then(function (response) {
                    if (response.data.status == 200) {
                        toaster
                            .pop({
                                type: 'success',
                                title: 'TrainType saved Succcessfully',
                                body: 'TrainType saved Succcessfully.'
                            });

                    }
                })

            }

            $scope.removeTrainType = function (trainTypeObj) {
                $timeout(function () {
                    var index = $scope.trainTypesList.indexOf(trainTypeObj);
                    $scope.trainTypesList.splice(index, 1);

                    toaster
                        .pop({
                            type: 'success',
                            title: 'trainType deleted Succcessfully',
                            body: 'trainType deleted Succcessfully.'
                        });
                }, 100);
            }

            $scope.reset = function () {
                $scope.traintypedetails = angular.copy($scope.blanktraindetails);
                $scope.clearInput();
                $scope.submitClass = "hide-errors";

            };
            $scope.$watch('traintypedetails', function (c) {
                $location.hash('trainTypeFormDiv');
                $anchorScroll();
		          });

        }

    }
}]);