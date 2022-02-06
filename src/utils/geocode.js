const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=sk.eyJ1IjoiaHVudXBvbGFnYW1hIiwiYSI6ImNrejZweDgxNTBlMmIyb245ZWxteTJhYmQifQ.vEHyDkRWfGLr_ZDYnmdFJQ'

    request({url: url, json: true},(error, response, body) => {
        if (error) {
            callback('Unable to connect to location service.',undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.',undefined)
        } else {
            callback(undefined,{
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode