const { mock, test } = require('node:test');
const assert = require('node:assert');
const WeatherAPI = require('../../services/weatherApi');
const LocationAPI = require('../../services/locationApi');
const ApiCoordinatior = require('../../api/apiCoordinator');

test('getForecastByAddress should return json containing the forecast', async (t) => {
    const addressString = 'http://localhost:8000/aUrl?street=123%20Main%20Stcity=Nowhere&state=IA';
    const forecast = {};
    const latLog = {lat: 1, long:1 }
    mock.method(LocationAPI.prototype, "getLatLongByAddress", async () => latLog);
    mock.method(WeatherAPI.prototype, "getForecastByLatLong", async () => forecast);
    const result = await ApiCoordinatior.getForecastByAddress(addressString);
    assert.deepEqual(result, JSON.stringify({}));
    mock.reset();
});