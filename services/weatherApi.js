const utils = require('../utils/httpUtil');

class WeatherAPI {
    constructor() {
        this.url = 'api.weather.gov';
    }

    async getForecastByLatLong(latLong) {
        var forecastLocation = await this.#getLocationUrl(latLong);
        return await this.#getForecastByLocationUrl(forecastLocation);
    }

    async #getLocationUrl(latLong) {
        let optionsForLocationLookup = {
            host: this.url,
            path: `/points/${latLong.lat},${latLong.long}`,
            method: "GET",
            headers: {
                'User-Agent': "sampleForecastApp"
            }
        }
        
        return this.#parsingFunctForLocationLookup(await utils.getHttpCall(optionsForLocationLookup));
    }

    async #getForecastByLocationUrl(forecastLocation) {
        let optionsForForecast = {
            host: this.url,
            path: new URL(forecastLocation).pathname,
            method: "GET",
            headers: {
                'User-Agent': "sampleForecastApp"
            }
        }

        return  this.#parsingFunctForForecast(await utils.getHttpCall(optionsForForecast));
    }

    #parsingFunctForForecast(body) {
        return body.properties.periods;
    };

    #parsingFunctForLocationLookup(body) {
        return body.properties.forecast;
    };
}

module.exports = WeatherAPI;