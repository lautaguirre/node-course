const request = require('request');

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/54f52fd3dce4859ab7b596079842c6fd/${lat},${long}?units=si`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect.');
    } else if (body.error) {
      callback(body.error);
    } else {
      const { temperature, precipProbability } = body.currently;
      const { temperatureHigh, temperatureLow } = body.daily.data[0];

      callback(undefined, `It's currently ${temperature} degrees out. This high today is ${temperatureHigh} with a low of ${temperatureLow}. There is a ${precipProbability}% chance of rain.`);
    }
  });
};

module.exports = forecast;
