import sinon from 'sinon';
import chai from 'chai';
const expect = chai.expect;

const apiClient = require('../../server/service/forecast.api.client');
const forecastController = require('../../server/controllers/forecast.controller');

describe("Server Controllers", () => {
  describe("GET 5 day forecast", () => {

    it("should retrive forecast", done => {
      let req, res, spy;

      req = res = {};
      req.params = {};
      req.params.city = 'city';
      spy = apiClient.getWeeklyForecast = sinon.spy();

      forecastController.findForecastByCity(req, res);
      expect(spy.calledOnce).to.equal(true);
      done();
    });

    it("should fail if city is not supplied", done => {
      let req, res;

      req = res = null;
      apiClient.getWeeklyForecast = sinon.spy();
      expect(forecastController.findForecastByCity.bind(forecastController.findForecastByCity, req, res)).to.throw('Cannot read property \'params\' of null');
      done();
    });

  });
});


