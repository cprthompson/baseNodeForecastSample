const WeatherAPI = require('../services/weatherApi');
const LocationAPI = require('../services/locationApi');

class ApiCoordinatior {
    constructor() {
    }

    static async getForecastByAddress(urlString) {
        var lagLong = await new LocationAPI().getLatLongByAddress(this.#parseAddress(urlString));
        var forecast = await new WeatherAPI().getForecastByLatLong(lagLong);
        return JSON.stringify(this.#simplifyForecastResponse(forecast));
    }

    static #parseAddress(urlString) {
        var parsedURL = new URL(urlString).searchParams
        return {
            street: parsedURL.get("street"),
            city: parsedURL.get("city"),
            state: parsedURL.get("state")
        };
    }

    static #simplifyForecastResponse(forecast) {
        let simpleForecast = [];
        Array.from(forecast).forEach(element => {
            let incomingDateTime = new Date(element.startTime);
            simpleForecast.push({
                dayName: element.name,
                date: `${incomingDateTime.getMonth() + 1}-${incomingDateTime.getDate()}-${incomingDateTime.getFullYear()}`,
                forecast: element.detailedForecast
            })
        });
        return simpleForecast;
    }
}


module.exports = ApiCoordinatior;