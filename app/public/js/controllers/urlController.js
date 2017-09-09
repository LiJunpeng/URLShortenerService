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

    $scope.getTime = function (time) {
        $scope.lineLabels = [];
        $scope.lineData = [];
        $scope.time = time;
        $http.get("/api/v1/urls/" + $routeParams.shortUrl + "/" + time)
            .success(function (data) {
                data.forEach(function (info) {

                    var legend = '';
                    if (time === 'hour') {
                        if (info._id.minutes < 10) {
                            info._id.minutes = '0' + info._id.minutes;
                        }
                        legend = info._id.hour + ':' + info._id.minutes;
                    }
                    if (time === 'day') {
                        legend = info._id.hour + ':00';
                    }
                    if (time === 'month') {
                        legend = info._id.month + '/' + info._id.day;
                    }

                    $scope['lineLabels'].push(legend);
                    $scope['lineData'].push(info.count);
                });
            });
    };

    $scope.getTime('hour');

}]);

