var DashboardModule = angular.module('DashboardModule', []);

DashboardModule.controller('DashboardController',
        [
            '$scope',
            '$http',
            '$location',
            function($scope, $http, $location) {
                $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";
                $scope.url = 'http://raj.rapidfunnel.com/api/login';
                $scope.loginItem = {};
                $scope.login = function() {
                    $http({
                        url: $scope.url,
                        method: "POST",
                        data: $.param($scope.loginItem)
                    }).success(function(data) {
                        var $response = data.response;
                        if ("true" == $response.status) {
                            $scope.statusMessage = 'User logged in sucessfully';
                            $location.path('/dashboard');
                        } else {
                            $scope.statusMessage = $response.errorMessage;
                        }
                    }).error(function(data) {
                        $scope.statusMessage = "Error Occured. Please try again";
                    });

                };
            }]);