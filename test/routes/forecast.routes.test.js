import sinon from 'sinon';
import chai from 'chai';
const expect = chai.expect;


const getForecastByCity = require('../../server/routes/forecastByCity.route');
const forecastController = require('../../server/controllers/forecast.controller');

describe("Routes", () => {
  describe("GET 5 day forecast", () => {

    it("should respond", done => {
      let req, res, spy;

      req = res = {};
      req.params = {};
      req.params.city = 'city';
      spy = forecastController.findForecastByCity = sinon.spy();

      getForecastByCity(req, res);
      expect(spy.calledOnce).to.equal(true);
      done();
    });

  });
});
