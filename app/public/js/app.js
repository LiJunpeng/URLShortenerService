var app = angular.module('tinyurlApp', ['ngRoute', 'ngResource']); //ngRoute说明需要用route模块

app.config(function ($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "./public/views/home.html",
        controller: "homeController"
    })
    .when("/urls/:shortUrl", {
        templateUrl: "./public/views/url.html",
        controller: "urlController"
    });
});



