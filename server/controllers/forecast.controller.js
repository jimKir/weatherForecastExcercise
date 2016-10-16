const apiClient = require('../service/forecast.api.client');
const Promise = require("es6-promise").Promise;
const COUNTRY_CODE = 'uk';

/**
 * Returns weekly forecast
 * @returns {Json}
 */
exports.findForecastByCity = (req, res) => {
  var cast = Promise.resolve(apiClient.getWeeklyForecast(req.params.city, COUNTRY_CODE));
  cast.then((v) => {
    res.json(v);
  });
}
