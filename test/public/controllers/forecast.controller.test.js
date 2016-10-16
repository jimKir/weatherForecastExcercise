describe('forecast', function () {

  beforeEach(angular.mock.module('app'));

  var $controller;
  var deferred;
  var $q;
  var $rootScope;
  var $scope;

  beforeEach(inject(function (_$q_, _$rootScope_, _$controller_) {
    $rootScope = _$rootScope_;
    $controller = _$controller_;
    $q = _$q_;
    $scope = _$rootScope_.$new();
    deferred = _$q_.defer();

    sinon.stub(window, 'fetch');

    var res = new window.Response(JSON.stringify(mockedForecastResponse), { //mockedForecastResponse is loaded as directly as globbal js var by karma runner through karma config
      status: 200,
      headers: {
        'Content-type': 'application/json'
      }
    });
    window.fetch.returns($q.when(res));

    $controller('ForecastCtrl', {
      $scope: $scope
    });
  }));

  afterEach(function () {
    window.fetch.restore();
  });


  it('should call the service with the given city', function () {
    $q.defer($scope.find("Edinburgh"));
    $scope.$apply();
    expect($scope.city).toBe("Edinburgh");
  });

  it('updateForecast should populate scope with five days forecast', function () {
    $scope.updateForecast($scope, JSON.stringify(mockedForecastResponse));
    expect($scope.forecast.now.length).toBe(5);
  });

  it('updateForecast should populate scope with forecast values', function () {
    $scope.updateForecast($scope, JSON.stringify(mockedForecastResponse));
    expect(!!$scope.forecast.now[0].date).toBe(true);
    expect(!!$scope.forecast.now[0].celcius).toBe(true);
    expect(!!$scope.forecast.now[0].description).toBe(true);
    expect(!!$scope.forecast.now[0].icon).toBe(true);
    expect(!!$scope.forecast.now[0].windSpeed).toBe(true);
    expect(!!$scope.forecast.now[0].cloudPercentage).toBe(true);
  });

});
