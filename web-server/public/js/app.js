console.log('Loaded');

const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const messageOne = document.querySelector('#forecast');
const messageTwo = document.querySelector('#location');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = searchInput.value;

  messageOne.textContent = 'Loading';
  messageTwo.textContent = '';

  fetch(`http://localhost:3001/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.data;
        messageTwo.textContent = data.location;
      }
    });
  });
});
