'use strict';
angular.module('matApp')
  .controller('pilotTypeFormCtrl', function ($scope, $state, $http, $resource) {

    $scope.pilotTypes = [];
    $scope.query = {
      sortBy: "name",
      limit: 10,
      page: 1

				}


				$scope.getPilotType = function () {
      var apiUrl = "http://localhost:3000/api/v1/pilots";
      $http.get(apiUrl, { params: $scope.query }).then(function (response) {
        $scope.pilotTypes = response.data.results;
        $scope.currentPage = response.data.current;
        $scope.perPage = response.data.options.perPage;
        $scope.totalPages = response.data.last;
        $scope.totalRecords = response.data.count;


      }, function (error) {


      })

				}
				$scope.getPilotType();

  });
