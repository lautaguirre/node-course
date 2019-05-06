const doWorkCallback = (callback) => {
  setTimeout(() => {
    callback(undefined, 'Success');
  }, 2000);
};

doWorkCallback((error, result) => {
  if (error) {
    return console.log(error);
  }

  console.log(result);
});