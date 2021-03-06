const express = require('express');
const Task = require('../models/task');
const authMiddleware = require('../middleware/auth');

const router = new express.Router();

router.post('/', authMiddleware, async (req, res) => {
  const task = new Task({ ...req.body, owner: req.user._id });

  try {
    await task.save();

    return res.status(201).send(task);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get('/', authMiddleware, async (req, res) => {
  const { completed, limit, skip, sortBy } = req.query;
  let match = {};
  let sort = {};

  if (completed === 'true' || completed === 'false') {
    match.completed = completed === 'true';
  }

  if (sortBy) {
    const parts = sortBy.split(':');

    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }

  try {
    await req.user.populate({
      path: 'tasks',
      match,
      options: {
        limit: parseInt(limit),
        skip: parseInt(skip),
        sort,
      },
    }).execPopulate();

    // ALTERNATIVE
    // const task = await Task.find({ owner: req.user._id });
    // return res.send(task);

    return res.send(req.user.tasks);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) {
      return res.status(404).send();
    }

    return res.send(task);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});


router.patch('/:id', authMiddleware, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['completed', 'description'];
  const isValidOperation = updates.every((el) => allowedUpdates.includes(el));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Ivalid operation' });
  }

  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });

    // const queryRes = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!task) {
      return res.status(404).send();
    }

    updates.forEach((update) => task[update] = req.body[update]);

    await task.save();

    return res.send(task);
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

    if (!task) {
      return res.status(404).send();
    }

    return res.send(task);
  } catch (e) {
    return res.status(500).send(e.message)
  }
});

module.exports = router;
