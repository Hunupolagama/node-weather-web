const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ee8e572aeb6567532e23549697a6aa67&units=m&query=' 
        + encodeURIComponent(latitude + ',' + longitude)

    request({url: url, json: true},(error, response, body) => {
        if (error) {
            callback('Unable to connect to Weather service.',undefined)
        } else if (body.error) {
            callback('Invalid weather data.',undefined)
        } else {
            callback(undefined,'It is currently '+ body.current.temperature + ' degress out. It feels like ' + body.current.feelslike + ' degress out.')
        }
    })
}

module.exports = forecast