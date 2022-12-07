const request = require("request");

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=036c4101ebae8a5f65092d493814c69c&query=${lat},${long}`;

    request({url, json:true}, (error, {body} = {}) => {
        if(error){
            callback("Unable to connect with the weather services.", undefined)
        } else if(body.error){
            callback("Unable to fetch the weather of the coordinates. Try another search.", undefined);
        } else {
            callback(undefined,body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degress out.")
        }
    })
}

module.exports = forecast;