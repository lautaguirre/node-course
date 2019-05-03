const request = require('request');

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibGF1dGFndWlycmUiLCJhIjoiY2p1enVubnU1MWN0azRkcXhnejN1NW4yMyJ9.I4ibXekISnAow0Rg9fR4CQ`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect.');
    } else if (body.features.length === 0) {
      callback('Unable to find locations.');
    } else {
      const { place_name, center: [ latitude, longitude ] } = body.features[0];

      callback(undefined, {
        latitude,
        longitude,
        location: place_name,
      });
    }
  });
};

module.exports = geoCode;
