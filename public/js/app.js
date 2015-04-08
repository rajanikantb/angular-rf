// list all dependencies for the module
var app = angular.module("newAngular",
        [
            'ngRoute',
            'DashboardModule'
        ]);
app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }]);

// routing for angular pages
app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: '../partial/dashboard.html',
            controller: 'DashboardController'
        }).when('/login', {
            templateUrl: '../partial/login.html',
            controller: 'DashboardController'
        }).otherwise({
            redirectTo: '/login'
        });
    }]);

