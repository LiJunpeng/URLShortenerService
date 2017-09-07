var app = angular.module("tinyurlApp");

app.controller("urlController", 
    ["$scope", "$http", "$routeParams", function ($scope, $http, $routeParams) {
    $http.get("/api/v1/urls/" + $routeParams.shortUrl)  // $routeParams??????? // "/api/v1/urls/" 不能少最后一个"/"
        .success(function (data) {
            $scope.shortUrl = data.shorUrl;
            $scope.longUrl = data.longUrl;
            $scope.shortUrlToShow = "http://localhost:3000/" + data.shortUrl;
        });
}]);

