'use strict';

var app = angular.module('app', []);//todo this should be in seoarate app js file


app.controller('ForecastCtrl', ['$scope', '$q', function ($scope, $q) {

  $scope.city = 'Edinburgh';//nice to have: initialise from browser location

  $scope.find = function (city) {
    getForecast(city, $scope);
  }

  $scope.updateForecast = function ($scope, body) {
    $scope.forecast = JSON.parse(body);
    var now;
    $scope.forecast.now = [];
    for (var i = 0; i < $scope.forecast.list.length; i += 8) {//will not use for-of  or other es6 syntax for the sake of browser support
      $scope.forecast.now.push(forecastDetails($scope.forecast.list[i]));
    }
  }

  //alternatively this can call a client side service for the sake of separation of concerns
  //$http is also an option. Using fetch and have consistent server/client is better IMHO
  function getForecast(city, $scope) {
    $q.when(fetch('/forecast/' + city))
      .then(function (response) {
        return response.text()
      }).then(function (body) {
      $scope.updateForecast($scope, body);
    })
  }

  function forecastDetails(data) {
    var now = {};
    now.date = new Date(data.dt_txt);
    now.celcius = data.main.temp - 273.15 | 0;
    now.description = data.weather[0].description;
    now.icon = data.weather[0].icon;
    now.windSpeed = data.wind.speed;
    now.cloudPercentage = data.clouds.all;
    return now;
  }

  $scope.forecast = {};
}]);
