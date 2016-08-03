'use strict';

angular.module('matApp')
  .controller('TrainTimeTableCtrl', function($scope,$state,$http,$resource) {
	  $scope.Days = Days;
	  $scope.trainNo = ($state.params.trainNo)?$state.params.trainNo:'';
	  $scope.startDay = ($state.params.startDay)?$state.params.startDay:'';
	  $scope.trainStations = [];

	
});
