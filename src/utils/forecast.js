

const request = require("request");


const getForecast = (latitude, longitude, callback) =>{
    const url = `http://api.weatherstack.com/current?access_key=b6143b9d601c46ccbfaa5916499e1fb2&query=${latitude},${longitude}&units=f`;

    request({url: url, json: true}, (error, {body} ) =>{
        if(error){
            callback("Unable to connect to weather service.", undefined);
        }else if(body.error){
                callback("Unable to find location", undefined);
        }else{
            const forecast = `The current forecast is  ${body.current.temperature} degrees out. Feels like ${body.current.feelslike} degrees out.`;
            callback(undefined, forecast);
        }
    });
}


module.exports = {getForecast : getForecast}