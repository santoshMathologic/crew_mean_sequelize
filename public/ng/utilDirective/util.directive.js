angular.module('matApp').directive('stBindModel', ['$compile', function ($compiler) {

    return {
    	restrict: "AE",
        require: '^stTable',
        link: function (scope, element, attrs, ctrl) {
            attrs.$observe('stBindModel', function (val) {
                ctrl.pipe();
            });
        }

    }

}]);