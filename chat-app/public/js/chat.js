const socket = io();

// Elements
const $messageForm = document.querySelector('#messageForm');
const $messafeFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $locationButton = document.querySelector('#sendLocation');

socket.on('message', (message) => {
  console.log(message);
});

$messageForm.addEventListener('submit', (e) => {
  e.preventDefault();

  $messageFormButton.setAttribute('disabled', 'disabled');

  const message = e.target.elements.message.value;

  socket.emit('sendMessage', message, (error) => {
    $messageFormButton.removeAttribute('disabled');
    $messafeFormInput.value = '';
    $messafeFormInput.focus();

    if (error) {
      return console.log(error);
    }

    console.log('Message Delivered');
  });
});

$locationButton.addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser');
  }

  $locationButton.setAttribute('disabled', 'disabled');

  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;

    socket.emit('sendLocation', { latitude, longitude }, () => {
      console.log('Location Delivered');
      $locationButton.removeAttribute('disabled');
    });
  });
});