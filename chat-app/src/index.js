const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;
const publicDirectory = path.join(__dirname, '../public');

app.use(express.json());
app.use(express.static(publicDirectory));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})