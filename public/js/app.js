// list all dependencies for the module
var app = angular.module("newAngular",
        [
            'ngRoute',
            'DashboardModule'
        ]);
app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.cache = true;
        $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";
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

app.constant('$appConstant',
    {
        ver: '1.0.0',
        serverUrl: 'http://raj.rapidfunnel.com'
    });
