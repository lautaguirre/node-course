const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');

const userOne = {
  name: 'Jest',
  email: 'jest@tester2.com',
  password: 'test12345'
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test('Should Sign up a new user', async () => {
  await request(app).post('/users').send({
    name: 'Jest',
    email: 'jest@tester.com',
    password: 'test12345'
  }).expect(201);
});

test('Should login existing user', async () => {
  await request(app).post('/users/login').send({
    email: userOne.email,
    password: userOne.password,
  }).expect(200);
});

test('Should not login existing user', async () => {
  await request(app).post('/users/login').send({
    email: userOne.email,
    password: 'asdasdaasdasddsa'
  }).expect(500);
});
