const express = require('express');

const app = express();
const port = 3001;

app.get('', (req, res) => {
  res.send('Holis');
});

app.get('/about', (req, res) => {
  res.send('<h1>About</h1>');
});

app.get('/weather', (req, res) => {
  res.send({
    forecast: 'Caen nieve',
    location: 'Rosario',
 });
});

app.listen(port, () => {
  console.log(`Server running on ${port}`)
});
