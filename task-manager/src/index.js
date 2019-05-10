const express = require('express');
const { Types } = require('mongoose');

require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();

    return res.status(201).send(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

app.get('/users', async (req, res) => {
  try {
    const queryRes = await User.find({});

    return res.send(queryRes);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const _id = req.params.id;
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

app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();

    return res.status(201).send(task);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

app.get('/tasks', async (req, res) => {
  try {
    const queryRes = await Task.find({});

    return res.send(queryRes);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

app.get('/tasks/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const queryRes = await Task.findById(_id);

    if (!queryRes) {
      return res.status(404).send();
    }

    return res.send(queryRes);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});