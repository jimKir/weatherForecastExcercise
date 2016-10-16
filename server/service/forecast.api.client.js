var fetch = require('node-fetch');

const VERSION = '2.5';//externalise these values following 12factors app pattern
const API_KEY = '9346ddd90761db2bba21610f8b1fd9b4';
const URL = 'http://api.openweathermap.org/data/';//calling api from server we keep the key secret
const MODE = 'json';
const COUNTRY_CODE = 'uk'

exports.getWeeklyForecast = (city) => {
  return fetch(URL + VERSION + '/forecast?q=' + city + ',' + COUNTRY_CODE + '&mode=' + MODE + '&appid=' + API_KEY)
    .then(function (res) {
      return res.json();
    });
}


