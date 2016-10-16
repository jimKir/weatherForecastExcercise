const forecastController = require('../controllers/forecast.controller');

function getForecastByCity(req, res) {
  forecastController.findForecastByCity(req, res);
}

module.exports = getForecastByCity;
