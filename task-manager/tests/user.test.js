const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userOneId  = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: 'Jest1',
  email: 'jest@tester.com',
  password: 'test12345',
  tokens: [{
    token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
  }],
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test('Should sign up a new user', async () => {
  const response = await request(app)
    .post('/users')
    .send({
      name: 'Jest2',
      email: 'jest@tester2.com',
      password: 'test12345'
    })
    .expect(201);

  // check if the user was added to the database
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  expect(response.body).toMatchObject({
    user: {
      name: 'Jest2',
      email: 'jest@tester2.com',
    },
    token: user.tokens[0].token,
  });
  expect(user.password).not.toBe('test12345');
});

test('Should login existing user', async () => {
  const response = await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();
  expect(user.tokens[1].token).toBe(response.body.token);
});

test('Should not login existing user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: 'asdasdaasdasddsa'
    })
    .expect(500);
});

test('Should return user profile', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('Should not return user withour authentication', async () => {
  await request(app)
    .get('/users/me')
    .send()
    .expect(401);
});

test('Should delete account for user', async () => {
  const response = await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.findById(response.body._id);
  expect(user).toBeNull();
});

test('Should not delete user\'s account', async () => {
  await request(app)
    .delete('/users/me')
    .send()
    .expect(401);
});
