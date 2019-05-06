const doWorkPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('success');
  }, 2000);
});

(async () => {
  try {
    console.log(await doWorkPromise);
  } catch (error) {
    console.log(error);
  }
})()
