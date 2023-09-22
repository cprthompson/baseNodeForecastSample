const WeatherAPI = require('../services/weatherApi');
const LocationAPI = require('../services/locationApi');

class ApiCoordinatior {
    constructor() {
    }

    static async getForecastByAddress(urlString) {
        var lagLong = await new LocationAPI().getLatLongByAddress(this.#parseAddress(urlString));
        var forecast = await new WeatherAPI().getForecastByLatLong(lagLong);
        return JSON.stringify(forecast);
    }

    static #parseAddress(urlString) {
        var parsedURL = new URL(urlString).searchParams
        return {
            street: parsedURL.get("street"),
            city: parsedURL.get("city"),
            state: parsedURL.get("state")
        };
    }
}


module.exports = ApiCoordinatior;