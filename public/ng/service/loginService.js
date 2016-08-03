var app = angular.module('matApp');
app.factory('AuthFactory', function ($state, $window, $http) {
    var auth = {
        doLogin: function (username, password) {

            console.log("" + username);
            console.log("" + password);
        },

        logout: function () {
            if (this.isLogged) {

                this.isLogged = false;
                //delete AuthenticationFactory.user;
                //delete AuthenticationFactory.userRole;
                delete $window.sessionStorage.userPlan;
                delete $window.sessionStorage.token;
                delete $window.sessionStorage.user;
                delete $window.sessionStorage.userRole;
                $cookies = {};

            }

        }

    }

    return auth;
});


