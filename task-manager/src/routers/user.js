const express = require('express');
const User = require('../models/user');

const router = new express.Router();

router.post('/', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();

    const token = await user.generateAuthToken();

    return res.status(201).send({ user, token });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();

    res.send({ user, token});
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const queryRes = await User.find({});

    return res.send(queryRes);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get('/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const queryRes = await User.findById(_id);

    if (!queryRes) {
      return res.status(404).send();
    }

    return res.send(queryRes);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

router.patch('/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every((el) => allowedUpdates.includes(el));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid Fields' });
  }

  try {
    const user = await User.findById(req.params.id);

    // const queryRes = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!user) {
      return res.status(404).send();
    }

    updates.forEach((update) => user[update] = req.body[update]);

    await user.save();

    return res.send(user);
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const queryRes = await User.findByIdAndDelete(req.params.id);

    if (!queryRes) {
      return res.status(404).send();
    }

    return res.send(queryRes);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

module.exports = router;
