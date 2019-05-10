// const doWorkPromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('success');
//   }, 2000);
// });

// (async () => {
//   try {
//     console.log(await doWorkPromise);
//   } catch (error) {
//     console.log(error);
//   }
// })()

const add = (a, b) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(a + b);
  }, 1000);
});

add(1, 6).then((res) => {
  console.log(res);

  return add(res, 2);
}).then((res2) => {
  console.log(res2);
}).catch(e => console.log(e));
