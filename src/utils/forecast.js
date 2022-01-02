const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=49e4277e519e6b7aefa18c710d4a5ca8&query=' + latitude + ',' + longitude + '&units=f'

    request({url, json: true}, (error, {body}) => {

        if(error){
            callback('Unable to connect location services!', undefined)
        }else if(body.error){
            callback('Unable to find the location, try another search', undefined)
        }else{
            callback(
                undefined, 
                'Current temperature ' + body.current.temperature + ' but feels like ' + body.current.feelslike + '. It is ' +  body.current.weather_descriptions[0] + 
                '. Also humidity is ' + body.current.humidity + '% and wind speed is about ' + body.current.wind_speed + ' mph')
        }

    })
}

module.exports = forecast