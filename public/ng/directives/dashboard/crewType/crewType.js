angular.module('matApp').directive('crewType', ['$compile', function ($compiler) {
    return {
        restrict: 'E',
        templateUrl: 'ng/directives/dashboard/crewType/crewType.tmpl.html',
        controller: function ($scope, $state, $timeout, $window, $anchorScroll, $location, $http, $resource, toaster) {

            $scope.Days = Days;
            $scope.crewTypeList = [];
            $scope.crewTypeObj = {};
            $scope.blanktraindetails = {};

            $scope.query = {
                sortBy: 'name',
                limit: 30,
                page: 1,

            };
            var apicrewType = "http://localhost:3000/api/v1/crewTypes"

            $scope.getCrewType = function () {
                $http.get(apicrewType, { params: $scope.query })
                    .then(function (response) {
                        $scope.crewTypeList = response.data.results;
                        $scope.currentPage = response.data.current;
                        $scope.perPage = response.data.options.perPage;
                        $scope.totalPages = response.data.last;
                        $scope.totalRecords = response.data.count;
                    });
            }


            $scope.getCrewType();

            $scope.saveCrewType = function (crewType) {
                var crewTypeUri = "http://localhost:3000/api/v1/crewTypes"

                $http.post(crewTypeUri, crewType).then(function (response) {
                    if (response.data.status == 200) {
                        toaster
                            .pop({
                                type: 'success',
                                title: 'CrewType saved Succcessfully',
                                body: 'CrewType saved Succcessfully.'
                            });

                    }
                })

            }

            $scope.removeCrewType = function (crew) {
                $timeout(function () {
                    var index = $scope.crewTypeList.indexOf(crew);
                    $scope.crewTypeList.splice(index, 1);

                    toaster
                        .pop({
                            type: 'success',
                            title: 'crewType deleted Succcessfully',
                            body: 'crewType deleted Succcessfully.'
                        });
                }, 100);
            }

            $scope.reset = function () {
                $scope.crewTypeObj = angular.copy($scope.blanktraindetails);
                $scope.clearInput();
                $scope.submitClass = "hide-errors";

            };
            $scope.$watch('crewTypeObj', function (c) {
                $location.hash('crewTypeFormDiv');
                $anchorScroll();
		          });



        }

    }
}]);