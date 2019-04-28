const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const address = process.argv[2];

if (!address) return console.log('Invalid Address');

geoCode(address, (error, { latitude, longitude, location }) => {
  if (error) {
    return console.log('Error', error);
  }

  forecast(longitude, latitude, (error, data) => {
    if (error)  {
      return console.log('Error', error);
    }

    console.log('Location', location);
    console.log('Data', data);
  });
});
