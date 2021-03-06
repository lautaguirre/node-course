const express = require('express');
const path = require('path');
const hbs = require('hbs');

const forecast = require('./utils/forecast');
const geoCode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3001;

// Define paths and port
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Template engine set up
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Static directory set up
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Lautaro',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Lautaro',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Lautaro',
  });
});

app.get('/weather', (req, res)=> {
  const { address } = req.query;

  if (!address) {
    return res.send({ error: 'No address provided' });
  }

  geoCode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(longitude, latitude, (error, data) => {
      if (error)  {
        return res.send({ error });
      }

      return res.send({ data, location });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    error: 'Help article not found',
    title: '404',
    name: 'Lautaro',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    error: 'Page not found',
    title: '404',
    name: 'Lautaro',
  });
});

app.listen(port, () => {
  console.log(`Server running on ${port}`)
});
