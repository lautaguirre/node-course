const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');
const { generateMessage } = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectory = path.join(__dirname, '../public');

app.use(express.json());
app.use(express.static(publicDirectory));

io.on('connection', (socket) => {
  console.log('Web socket connection');

  socket.emit('message', generateMessage('Welcome!'));
  socket.broadcast.emit('message', generateMessage('A new user has joined'));

  socket.on('sendMessage', (message, callback) => {
    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback('Profanity is not allowed');
    }

    io.emit('message', generateMessage(message));
    callback();
  });

  socket.on('sendLocation', ({ latitude, longitude }, callback) => {
    io.emit('locationMessage', `https://google.com/maps?q=${latitude},${longitude}`);
    callback();
  });

  socket.on('disconnect', () => {
    io.emit('message', generateMessage('A client has disconnected'));
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
})