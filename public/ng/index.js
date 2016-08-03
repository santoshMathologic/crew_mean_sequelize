'use strict';

var api = {
    protocol: 'http',
    server: 'localhost',
    port: 4000,
    baseUrl: '/api/v1',
    loginUrl: '/login',
    registerUrl: '/register'
};

var apiUrl = {};
apiUrl.protocol = "http";
apiUrl.server = "localhost";

var apiUrl = api.protocol + '://' + api.server + ':' + api.port + api.baseUrl;
var apiLoginUrl = api.protocol + '://' + api.server + ':' + api.port + api.loginUrl;
var apiRegisterUrl = api.protocol + '://' + api.server + ':' + api.port + api.registerUrl;
var initInjector = angular.injector(['ng']);
var $http = initInjector.get('$http');

var app = angular
    .module('matApp', [
        'oc.lazyLoad',
        'ngRoute',
        'ui.router',
        'ui.bootstrap',
        'angular-loading-bar',
        'ngResource',
        'ngSanitize',
        'ngAnimate',
        'ngCookies',
        'angucomplete-alt',
        'angular-confirm',
        'toaster',
        'ngAutocomplete',
        'smart-table',
        'AxelSoft',
        'ngFileUpload',
        'flow',
        'ngSanitize'
    

    ]);
app.config(['$routeProvider', '$locationProvider', '$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$httpProvider',
    function ($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $httpProvider) {
        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
        });



        $urlRouterProvider.otherwise('/home/dashboard');
        $stateProvider
            .state('home', {
                templateUrl: 'ng/directives/home/home.directive.html',
                url: '/home',
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(
                            {
                                name: 'matApp',
                                files: [
                                    'ng/directives/home/home.js'
                                ]
                            })
                    }
                }
            })

            .state('home.login', {
                templateUrl: 'ng/directives/login/login.directive.html',
                url: '/login',
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(
                            {
                                name: 'matApp',
                                files: [
                                    'ng/service/loginService.js',
                                    'ng/directives/login/login.js',

                                ]
                            })
                    }
                }
            })
            .state('home.register', {
                templateUrl: 'ng/directives/register/register.directive.html',
                url: '/register',
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(
                            {
                                name: 'matApp',
                                files: [
                                    'ng/directives/register/register.js',

                                ]
                            })
                    }
                }
            }).state('home.dashboard',
            {
                template: '<dashboard></dashboard>',
                url: '/dashboard',
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(
                            {
                                name: 'matApp',
                                files: [
                                    'ng/directives/dashboard/dashboard.js',
                                    'ng/directives/dashboard/header/header.js',
                                    'ng/directives/dashboard/footer/footer.js',
                                    'ng/directives/dashboard/sidebar/sidebar.js',
                                    'ng/directives/dashboard/verticalMenu/verticalMenu.js',
                                    'ng/directives/dashboard/pagination/pageSelect.directive.js',
                                    'ng/util/timeFilter.js',
                                    


                                ]
                            })
                    }
                }
            }).state('home.dashboard.users',
            {
                templateUrl: 'ng/directives/dashboard/User/user.directive.html',
                url: '/users',
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(
                            {
                                name: 'matApp',
                                files: [
                                    'ng/directives/dashboard/User/user.js'

                                ]
                            })
                    }
                }
            }).state('home.dashboard.userPlans', {
                templateUrl: "ng/directives/dashboard/UserPlan/userPlan.directive.html",
                url: "/userPlan",
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: "matApp",
                            files: [
                                'ng/directives/dashboard/UserPlan/userPlan.js',
                            ]
                        })
                    }
                }
            }).state('home.dashboard.train', {
                templateUrl: "ng/directives/dashboard/train/train.directive.html",
                url: "/train",
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: "matApp",
                            files: [
                                'ng/directives/dashboard/train/train.js',
                            ]
                        })
                    }
                }
            }).state('home.dashboard.trainTimeTable', {
                url: '/trainTimeTable/:trainNo/:startDay',
                controller: 'TrainTimeTableCtrl',
                templateUrl: 'ng/directives/dashboard/trainTimeTable/trainTimeTable.directive.html',
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'matApp',
                            files: [
                                'ng/directives/dashboard/trainTimeTable/trainTimeTable.js',
                                'ng/controllers/trainTimeTable.js'
                            ]
                        })
                    }
                }
            }).state('home.dashboard.stations', {
                url: '/station',
                controller: 'stationCtrl',
                templateUrl: 'ng/directives/dashboard/station/station.directive.html',
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'matApp',
                            files: [
                                'ng/directives/dashboard/station/station.js',
                                'ng/controllers/station.js'
                            ]
                        })
                    }
                }
            }).state('home.dashboard.divisions', {
                url: '/division',
                controller: 'divisionCtrl',
                templateUrl: 'ng/directives/dashboard/division/division.directive.html',
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'matApp',
                            files: [
                                'ng/directives/dashboard/division/division.js',
                                'ng/controllers/division.js'
                            ]
                        })
                    }
                }
            }).state('home.dashboard.smalldashboard', {
                url: '/dashboard',
                templateUrl: 'ng/directives/dashboard/smalldashboard/smalldashboard.directive.html',
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'matApp',
                            files: [
                                'ng/directives/dashboard/smalldashboard/smalldashboard.js',

                            ]
                        })
                    }
                }
            }).state('home.dashboard.trainType', {
                url: '/type',
                controller: 'trainTypeCtrl',
                templateUrl: 'ng/directives/dashboard/trainType/trainType.directive.html',
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'matApp',
                            files: [
                                'ng/directives/dashboard/trainType/trainType.js',
                                'ng/controllers/trainType.js'

                            ]
                        })
                    }
                }
            }).state('home.dashboard.crewType', {
                url: '/crewtype',
                controller: 'crewTypeCtrl',
                templateUrl: 'ng/directives/dashboard/crewType/crewType.directive.html',
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'matApp',
                            files: [
                                'ng/directives/dashboard/crewType/crewType.js',
                                'ng/controllers/crewType.js'

                            ]
                        })
                    }
                }
            }).state('home.dashboard.drivingSection', {
                url: '/drivingSection/:trainNo/:startDay',
                controller: 'drivingSectionCtrl',
                templateUrl: 'ng/directives/dashboard/drivingSection/drivingSection.directive.html',
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'matApp',
                            files: [
                                'ng/directives/dashboard/drivingSection/drivingSection.js',
                                'ng/controllers/drivingsection.js'

                            ]
                        })
                    }
                }
            }).state('home.dashboard.drivingSectionforallday', {
                url: '/drivingSectionforallday',
                controller: 'divisionAllCtrl',
                templateUrl: 'ng/directives/dashboard/drivingSection/drivingSection_For_All_Day/drivingSectionAll.directive.html',
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'matApp',
                            files: [
                                'ng/directives/dashboard/drivingSection/drivingSection_For_All_Day/drivingSectionAll.js',
                                'ng/controllers/drivingsectionAll.js'

                            ]
                        })
                    }
                }
            })
            
            
            
            .state('home.dashboard.drivingDuty', {
                url: '/drivingDuty/:trainNo/:startDay',
                controller: 'drivingDutyCtrl',
                templateUrl: 'ng/directives/dashboard/drivingDuty/drivingDuty.directive.html',
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'matApp',
                            files: [
                                'ng/directives/dashboard/drivingDuty/drivingDuty.js',
                                'ng/controllers/drivingDuty.js'

                            ]
                        })
                    }
                }
            })
            .state('home.dashboard.salary', {
                url: '/salary',
                controller: 'salaryCtrl',
                templateUrl: 'ng/directives/dashboard/salary/salary.directive.html',
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'matApp',
                            files: [
                                'ng/directives/dashboard/salary/salary.js',
                                'ng/controllers/salary.js'

                            ]
                        })
                    }
                }
            }).state('home.dashboard.upload', {
                url: '/upload',
                controller: 'uploadsCtrl',
                templateUrl: 'ng/directives/dashboard/Uploads/uploads.directive.html',
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'matApp',
                            files: [
                                'ng/directives/dashboard/Uploads/uploads.js',
                                'ng/service/crewLinkServices/uploadService.js',
                                'ng/service/crewLinkServices/testService.js',
                                'ng/controllers/uploads.js'

                            ]
                        })
                    }
                }
            }).state('home.dashboard.createPilot', {
                url: '/pilot',
                controller: 'pilotCtrl',
                templateUrl: 'ng/directives/dashboard/Pilot/pilot.directive.html',
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'matApp',
                            files: [
                                'ng/directives/dashboard/Pilot/pilot.js',
                                'ng/controllers/pilot.js'

                            ]
                        })
                    }
                }
            })
          .state('home.dashboard.pilotType', {
                url: '/pilotType',
                controller: 'pilotTypeFormCtrl',
                templateUrl: 'ng/directives/dashboard/Pilot/pilotTypeForm/pilotTypeForm.directive.html',
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'matApp',
                            files: [
                                'ng/directives/dashboard/Pilot/pilotTypeForm/pilotTypeForm.js',
                                'ng/controllers/pilotTypeForm.js'

                            ]
                        })
                    }
                }
            }).state('home.dashboard.pilotDetail', {
                url: '/pilotList',
                controller: 'pilotListCtrl',
                templateUrl: 'ng/directives/dashboard/Pilot/ListPilot/pilotDetail.directive.html',
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'matApp',
                            files: [
                                'ng/directives/dashboard/Pilot/ListPilot/pilotDetail.js',
                                'ng/controllers/PilotList.js'
                                

                            ]
                        })
                    }
                }
            })
            .state('home.Opportunity', {
                url: '/Opportunity',
                templateUrl: '/ng/directives/create.html',
                controller: function ($scope) {



                    console.log("In opportunity");
                }

            });

    }]);