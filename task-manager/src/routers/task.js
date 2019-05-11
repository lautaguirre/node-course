const express = require('express');
const Task = require('../models/task');

const router = new express.Router();

router.post('/', async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();

    return res.status(201).send(task);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const queryRes = await Task.find({});

    return res.send(queryRes);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get('/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const queryRes = await Task.findById(_id);

    if (!queryRes) {
      return res.status(404).send();
    }

    return res.send(queryRes);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});


router.patch('/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['completed', 'description'];
  const isValidOperation = updates.every((el) => allowedUpdates.includes(el));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Ivalid operation' });
  }

  try {
    const queryRes = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!queryRes) {
      return res.status(404).send();
    }

    return res.send(queryRes);
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const queryRes = await Task.findByIdAndDelete(req.params.id);

    if (!queryRes) {
      return res.status(404).send();
    }

    return res.send(queryRes);
  } catch (e) {
    return res.status(500).send(e.message)
  }
});

module.exports = router;
