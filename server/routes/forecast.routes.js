const express = require('express');
const router = express.Router();
const getForecastByCity = require('./forecastByCity.route.js');

router.get('/:city', getForecastByCity);

module.exports = router;

