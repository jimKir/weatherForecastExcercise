import offlineResponse from "../response";
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import mockery from 'mockery';
import fetchMock from 'fetch-mock';

const forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=edinburgh,uk&mode=json&appid=9346ddd90761db2bba21610f8b1fd9b4';
const should = chai.should();
chai.use(chaiAsPromised);
const apiClient = require('../../server/service/forecast.api.client');
let testDataClone = {};

beforeEach(() => {
  testDataClone = JSON.parse(JSON.stringify(offlineResponse));
});

afterEach(() => {
  fetchMock.restore();
  mockery.deregisterMock('fetch');
});

/** @test {ForecastApiClient} */
it('Api client should make a request to /forecastUrl with a custom city when city is specified', done => {
  mockery.registerMock('fetch', fetchMock
    .once(forecastUrl, testDataClone));
  apiClient.getWeeklyForecast('edinburgh')
    .then(() => {
      fetchMock.calls().unmatched.length.should.equal(0);
      done();
    }).catch(done);
});

it('Api client should make a request to /error url with a custom city when city is specified and still return the response content', done => {
  mockery.registerMock('fetch', fetchMock
    .once('*', {'throws': new Error('TypeError: Failed to fetch')}));
  apiClient.getWeeklyForecast('')
    .then(() => {
      fetchMock.calls().unmatched.length.should.equal(0);
      done();
    }).catch(done);
});

