const socket = io();

socket.on('countUpdated', (count) => {
  console.log(count);
});

const button = document.querySelector('#increment').addEventListener('click', () => {
  socket.emit('increment');
});