const { mock, test } = require('node:test');
const assert = require('node:assert');
const WeatherAPI = require("../../services/weatherApi");
const utils = require('../../utils/httpUtil');

test('getForecastByLatLong should return a populated latlog object', async (t) => {
    const mockedResponseLocation = {
        properties: {
            forecast: "http://localhost:8000/apath"
        }
    };
    const mockedResponseForecast = {
        properties: {
            periods: [{ rawr: true}]
        }
    };
    const latLong = {
        lat: 38.846,
        long: -76.9275
    }
    var callCount = 0;
    mock.method(utils, "getHttpCall", async () => {
        if(callCount > 0){
           return mockedResponseForecast
        }
        callCount++;
        return mockedResponseLocation
    });
    const result = await new WeatherAPI().getForecastByLatLong(latLong);
    assert.deepEqual(result, mockedResponseForecast.properties.periods);
    mock.reset();
});