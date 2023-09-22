const utils = require('../utils/httpUtil');

class LocationAPI {
    constructor() {
        this.url = 'geocoding.geo.census.gov';
    }

    async getLatLongByAddress(address) {
        let replacedSpacesStreet = address.street.replace(/ /g, '+');
        let replacedSpacesCity = address.city.replace(/ /g, '+');
        let options = {
            host: this.url,
            path: `/geocoder/geographies/address?street=${replacedSpacesStreet}&city=${replacedSpacesCity}&state=${address.state}&benchmark=Public_AR_Census2020&vintage=Census2020_Census2020&format=json`,
            method: "GET"
        }

        return this.#parsingFunct(await utils.getHttpCall(options));
    }

    #parsingFunct(body) {
        let latLong = {};
        latLong.lat = +body.result.addressMatches[0].coordinates.y.toFixed(4);
        latLong.long = +body.result.addressMatches[0].coordinates.x.toFixed(4);
        return latLong;
    }
    
}

module.exports = LocationAPI;