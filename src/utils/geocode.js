const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoia2FzbWFkZWkiLCJhIjoiY2thbGF3ZTZ0MG82bDMxbHM5d3FiZWM4diJ9.VCTTtSFRwop3hKD5vbYr8A&limit=1`
    request({ url, json: true }, (error, response, body) => {
        if (error) {
            callback(`Unable to connect to location services`, undefined)
        } else if (body.features !== undefined && body.features.length >= 1) {
        const place = body.features[0];
        const longitude = place.center[0];
        const latitude = place.center[1];
        const placeName = place.place_name
        callback(undefined, { longitude, latitude, placeName })
        } else {
            callback(`Unable to connect to api.mapbox.com service.`, undefined)
        }
    })
}

module.exports = geocode