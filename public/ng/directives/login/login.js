angular.module('matApp')
    .directive('login', ['$compile', function ($compile) {
        return {
            restrict: 'E',
            templateUrl: 'ng/directives/login/login.tmpl.html',
            controller: function ($scope, $state, $log, $window, $location, AuthFactory) {


               
                $scope.userObj = {
                    username: "",
                    password: ""

                }


                $scope.login = function () {
                    AuthFactory.doLogin($scope.userObj.username, $scope.userObj.password);
                    $state.go('home.dashboard.userPlans');

                }



            }

        };
    }]);