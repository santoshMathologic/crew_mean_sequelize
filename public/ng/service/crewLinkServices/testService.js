

angular.module('matApp').factory('testService', function ($state, $window, $http, $q, $resource) {
        
        return $resource("http://localhost:3000/api/v1/upload/getUploadBy/:id",{id: '@_id'});

});