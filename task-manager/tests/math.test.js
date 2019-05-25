const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math');

test('calculate tip', () => {
  const total = calculateTip(10, 20);

  expect(total).toBe(12);
});

test('new tip', () => {
  const total = calculateTip(10);

  expect(total).toBe(12.5)
});

test('farenheitToCelsius', () => {
    const total = fahrenheitToCelsius(32);

    expect(total).toBe(0);
});

test('celsiulsToFarenheit', () => {
  const total = celsiusToFahrenheit(0);

  expect(total).toBe(32);
});

// test('async', (done) => {
//   setTimeout(() => {
//     expect(1).toBe(2);
//     done();
//   }, 1000);
// });

test('add', (done) => {
  add(2, 3).then((sum) => {
    expect(sum).toBe(5);
    done();
  });
});

test('add async', async () => {
  const res = await add(10, 22);
  expect(res).toBe(32);
});