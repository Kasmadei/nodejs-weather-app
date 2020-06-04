const request = require('request');

const DEFAULT_URL = 'http://api.weatherstack.com'
const ACCESS_KEY = '2704c7df8cfc302b10c4f6e89b2b973c'

const getWeatherForecast = ( longitude, latitude, placeName, callback) => {
    const url = `${DEFAULT_URL}/current?access_key=${ACCESS_KEY}&query=${latitude},${longitude}`
    request({ url, json: true }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined)
        } else if (body.error) {
            callback(`Unable to find location. ${body.error.info ? body.error.info : ''}`, undefined)
        } else {
            callback(undefined, { 
                placeName: placeName, 
                temperature: body.current.temperature, 
                weatherDescriptions: body.current.weather_descriptions, 
                weatherIcon: body.current.weather_icons[0] 
            })
        }
    })
}

module.exports = getWeatherForecast