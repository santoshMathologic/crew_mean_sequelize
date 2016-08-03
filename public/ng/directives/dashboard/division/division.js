angular.module('matApp').directive('division', ['$compile', function ($compiler) {
    return {
        restrict: 'E',
        templateUrl: 'ng/directives/dashboard/division/division.tmpl.html',
        controller: function ($scope, $state, $window, $location,$anchorScroll,$timeout, $http, $resource, toaster) {

            $scope.Days = Days;
            $scope.divisionList = [];
            $scope.divisionObj = {};
            $scope.blanktraindetails = {};

            $scope.query = {
                sortBy: 'name',
                limit: 10,
                page: 1,

            };
            var apidivision = "http://localhost:3000/api/v1/divisions"

            $scope.getdivision = function () {
                $http.get(apidivision, { params: $scope.query })
                    .then(function (response) {
                        $scope.divisionList = response.data.results;
                        $scope.currentPage = response.data.current;
                        $scope.perPage = response.data.options.perPage;
                        $scope.totalPages = response.data.last;
                        $scope.totalRecords = response.data.count;
                    });
            }


            $scope.getdivision();

            $scope.removeDivision = function (division) {
                $timeout(function () {
                    var index = $scope.divisionList.indexOf(division);
                    $scope.divisionList.splice(index, 1);

                    toaster
                        .pop({
                            type: 'success',
                            title: 'division deleted Succcessfully',
                            body: 'division deleted Succcessfully.'
                        });
                }, 100);
            }
            $scope.saveDivision = function (divisionObj) {
                var apidivisionUri = "http://localhost:3000/api/v1/divisions"

                console.log($scope.divisionObj.name);
                $http.post(apidivisionUri, divisionObj).then(function (response) {
                    if (response.data.status == 200) {
                        toaster
                            .pop({
                                type: 'success',
                                title: 'Division saved Succcessfully',
                                body: 'Division saved Succcessfully.'
                            });

                    }
                })


            }
            $scope.reset = function () {
                $scope.divisionObj = angular.copy($scope.blanktraindetails);
                $scope.clearInput();
                $scope.submitClass = "hide-errors";

            };
            $scope.$watch('divisionObj', function (c) {
                $location.hash('divisionFormDiv');
                $anchorScroll();
		          });


        }

    }
}]);