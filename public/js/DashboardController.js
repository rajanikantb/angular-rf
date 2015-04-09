var DashboardModule = angular.module('DashboardModule', ['ngTable']);

DashboardModule.controller('DashboardController',
        [
            '$scope',
            '$http',
            '$location',
            '$window',
            function ($scope, $http, $location, $window) {
                $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";
                $scope.url = 'http://san.rapidfunnel.com/api/login';
                $scope.loginItem = {};
                $scope.login = function () {
                    $http({
                        url: $scope.url,
                        method: "POST",
                        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                        data: $.param($scope.loginItem)
                    }).success(function (data) {
                        var $response = data.response;
                        if ("true" == $response.status) {
                            $scope.statusMessage = 'User logged in sucessfully';
                            $window.sessionStorage.userId = data.response.content.userId;
                            $window.sessionStorage.apiKey = data.response.content.accessToken;
                            $location.path('/dashboard');
                        } else {
                            $scope.statusMessage = $response.errorMessage;
                        }
                    }).error(function (data) {
                        $scope.statusMessage = "Error Occured. Please try again";
                    });

                };
            }]);

DashboardModule.controller('DashboardMainController',
        [
            '$scope',
            '$http',
            '$location',
            '$window',
            '$filter',
            'ngTableParams',
            function ($scope, $http, $location, $window, $filter, ngTableParams) {
                $scope.logout = function () {
                    $location.path('/login');
                }

                $scope.contact = {};
                $scope.contact.load = false;

                $scope.getContact = function () {
                    var userId = $window.sessionStorage.userId;
                    var apiKey = $window.sessionStorage.apiKey;

                    $http({
                        method: 'POST',
                        url: 'http://san.rapidfunnel.com/api/account-contact/get-contact',
                        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                        data: $.param({userId: userId, accessToken: apiKey})
                    }).
                            success(function (data) {
                                $scope.contact.load = true;
                                $scope.contact.items = data.response.content.contacts;

                                $scope.tableParams = new ngTableParams({
                                    page: 1, // show first page
                                    count: 10
                                }, {
                                    total: data.response.content.contacts.length, // length of data
                                    getData: function ($defer, params) {
                                        // use build-in angular filter
                                        var orderedData = params.filter() ?
                                                $filter('filter')(data.response.content.contacts, params.filter()) :
                                                data.response.content.contacts;

                                        $scope.contacts = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

                                        params.total(orderedData.length); // set total for recalc pagination
                                        $defer.resolve($scope.contacts);
                                    }
                                });


                            }).
                            error(function (data) {
                                console.log(data);
                            });
                };

            }]);