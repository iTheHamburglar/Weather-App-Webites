

const request = require("request");


const getForecast = (latitude, longitude, callback) =>{
    const url = `http://api.weatherstack.com/current?access_key=b6143b9d601c46ccbfaa5916499e1fb2&query=${latitude},${longitude}&units=f`;

    request({url: url, json: true}, (error, {body} ) =>{
        if(error){
            callback("Unable to connect to weather service.", undefined);
        }else if(body.error){
                callback("Unable to find location", undefined);
        }else{

            const forecastInfo = {
                temperatureData: `The current forecast is  ${body.current.temperature} degrees out. Feels like ${body.current.feelslike} degrees out.`,
                humidity: `Humidity ${body.current.humidity}%`,
                windData: body.current.wind_speed > 0 ? `Wind speed ${body.current.wind_speed}mph from ${body.current.wind_dir}` : undefined,
                icon: body.current.weather_icons[0]
            }

            callback(undefined, forecastInfo);
        }
    });
}

module.exports = {getForecast : getForecast}