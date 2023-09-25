const { mock, test } = require('node:test');
const assert = require('node:assert');
const WeatherAPI = require('../../services/weatherApi');
const LocationAPI = require('../../services/locationApi');
const ApiCoordinatior = require('../../api/apiCoordinator');

const sampleResponse = JSON.parse(`[
	{
		"number": 1,
		"name": "Today",
		"startTime": "2023-09-25T09:00:00-05:00",
		"endTime": "2023-09-25T18:00:00-05:00",
		"isDaytime": true,
		"temperature": 66,
		"temperatureUnit": "F",
		"temperatureTrend": null,
		"probabilityOfPrecipitation": {
			"unitCode": "wmoUnit:percent",
			"value": 30
		},
		"dewpoint": {
			"unitCode": "wmoUnit:degC",
			"value": 15
		},
		"relativeHumidity": {
			"unitCode": "wmoUnit:percent",
			"value": 100
		},
		"windSpeed": "10 mph",
		"windDirection": "WNW",
		"icon": "https://api.weather.gov/icons/land/day/rain_showers/tsra_sct,30?size=medium",
		"shortForecast": "Chance Rain Showers",
		"detailedForecast": "A chance of rain showers before 4pm, then a chance of showers and thunderstorms between 4pm and 5pm, then a slight chance of showers and thunderstorms. Mostly cloudy, with a high near 66. West northwest wind around 10 mph. Chance of precipitation is 30%. New rainfall amounts less than a tenth of an inch possible."
	},
	{
		"number": 2,
		"name": "Tonight",
		"startTime": "2023-09-25T18:00:00-05:00",
		"endTime": "2023-09-26T06:00:00-05:00",
		"isDaytime": false,
		"temperature": 54,
		"temperatureUnit": "F",
		"temperatureTrend": "rising",
		"probabilityOfPrecipitation": {
			"unitCode": "wmoUnit:percent",
			"value": 20
		},
		"dewpoint": {
			"unitCode": "wmoUnit:degC",
			"value": 14.444444444444445
		},
		"relativeHumidity": {
			"unitCode": "wmoUnit:percent",
			"value": 100
		},
		"windSpeed": "5 to 10 mph",
		"windDirection": "NW",
		"icon": "https://api.weather.gov/icons/land/night/tsra_hi,20/bkn?size=medium",
		"shortForecast": "Slight Chance Showers And Thunderstorms then Mostly Cloudy",
		"detailedForecast": "A slight chance of showers and thunderstorms before 8pm. Mostly cloudy. Low around 54, with temperatures rising to around 57 overnight. Northwest wind 5 to 10 mph. Chance of precipitation is 20%. New rainfall amounts less than a tenth of an inch possible."
	}
]`);

test('getForecastByAddress should return json containing the forecast', async (t) => {
    const addressString = 'http://localhost:8000/aUrl?street=123%20Main%20Stcity=Nowhere&state=IA';
    const latLog = {lat: 1, long:1 }
    const expected = [
        {
            dayName: 'Today',
            date: '9-25-2023',
            forecast: 'A chance of rain showers before 4pm, then a chance of showers and thunderstorms between 4pm and 5pm, then a slight chance of showers and thunderstorms. Mostly cloudy, with a high near 66. West northwest wind around 10 mph. Chance of precipitation is 30%. New rainfall amounts less than a tenth of an inch possible.'
        },
        {
            dayName: 'Tonight',
            date: '9-25-2023',
            forecast: 'A slight chance of showers and thunderstorms before 8pm. Mostly cloudy. Low around 54, with temperatures rising to around 57 overnight. Northwest wind 5 to 10 mph. Chance of precipitation is 20%. New rainfall amounts less than a tenth of an inch possible.'
        }
    ];
    mock.method(LocationAPI.prototype, "getLatLongByAddress", async () => latLog);
    mock.method(WeatherAPI.prototype, "getForecastByLatLong", async () => sampleResponse);
    const result = await ApiCoordinatior.getForecastByAddress(addressString);
    assert.deepEqual(result, JSON.stringify(expected));
    mock.reset();
});