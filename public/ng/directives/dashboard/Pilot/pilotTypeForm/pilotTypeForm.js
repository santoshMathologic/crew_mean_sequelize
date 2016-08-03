'use strict';
angular.module('matApp')
	.directive('pilotTypeForm', function () {
		return {
			templateUrl: 'ng/directives/dashboard/Pilot/pilotTypeForm/pilotTypeForm.tmpl.html',
			restrict: 'E',
			replace: true,
			scope: {
				'pilottypedetails': '='
			},
			controller: function ($scope, $location, $anchorScroll, $http, toaster) {
				$scope.blankpilotTypedetails = {};
				$scope.pilottypedetails = {};
				if (!$scope.pilotTypedetails)
					$scope.pilotTypedetails = {};
				$scope.submitClass = 'show-errors';


				$scope.savePilotType = function (pilotTypeobj, saveType) {

					var pilotUri = "http://localhost:3000/api/v1/pilots"

					$http.post(pilotUri, pilotTypeobj).then(function (response) {
						if (response.data.status == 200) {
							//toaster.pop({ type: 'success', title: 'New Pilot Type ' + saveType.capitalizeFirstLetter() + 'd.', body: 'Pilot Type ' + saveType.capitalizeFirstLetter() + 'd' + ' Successfully!!!' });

						}
					}, function (error) {
						toaster.pop({ type: 'error', title: 'Error', body: 'Unable To ' + saveType.capitalizeFirstLetter() + ' Pilot Type. Please Try Again!!!' });
					})




				};


				$scope.reset = function () {
					$scope.pilottypedetails = angular.copy($scope.blankpilotTypedetails);
					$scope.submitClass = "hide-errors";
				};

				$scope.$watch('pilottypedetails', function (c) {
					$location.hash('pilotTypeFormDiv');
					$anchorScroll();
				});
			}
		}
				});
