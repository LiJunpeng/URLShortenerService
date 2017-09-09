var app = angular.module("tinyurlApp");

app.controller("urlController", 
    ["$scope", "$http", "$routeParams", function ($scope, $http, $routeParams) {
    $http.get("/api/v1/urls/" + $routeParams.shortUrl)  // $routeParams = /:shortUrl // "/api/v1/urls/" 不能少最后一个"/"
        .success(function (data) {
            $scope.shortUrl = data.shorUrl;
            $scope.longUrl = data.longUrl;
            $scope.shortUrlToShow = "http://localhost/" + data.shortUrl;
        });
    $http.get("/api/v1/urls/" + $routeParams.shortUrl + "/totalClicks")
        .success(function (data) {
            $scope.totalClicks = data;
        });

    var renderChart = function (chart, infos) {
        $scope[chart + "Data"] = [];
        $scope[chart + "Labels"] = [];
        $http.get("/api/v1/urls/" + $routeParams.shortUrl + "/" + infos)
            .success(function (data) {
                data.forEach(function (info) {
                    $scope[chart + "Data"].push(info.count);
                    $scope[chart + "Labels"].push(info._id);
                });
            });
    }

    renderChart("doughnut", "referer");
    renderChart("pie", "country");
    renderChart("base", "platform");
    renderChart("bar", "browser");

}]);

