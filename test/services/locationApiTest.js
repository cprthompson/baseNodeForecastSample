const { mock, test } = require('node:test');
const assert = require('node:assert');
const LocationAPI = require("../../services/locationApi");
const utils = require('../../utils/httpUtil');

test('getLatLongByAddress should return a populated latlog object', async (t) => {
    const mockedResponse = {
        result: {
            addressMatches: [
                {coordinates:
                    { x: -76.92748724230096, y: 38.84601622386617 }
                }
            ]
        }
    };
    const address = {
        street: "123 Main St",
        city: "Nowhere",
        state: "IA"
    };
    const expected = {
        lat: 38.846,
        long: -76.9275
    }
    mock.method(utils, "getHttpCall", async () => mockedResponse);
    const result = await new LocationAPI().getLatLongByAddress(address);
    assert.deepEqual(result, expected);
    mock.reset();
});

//need to make more robust with negative scenario tests