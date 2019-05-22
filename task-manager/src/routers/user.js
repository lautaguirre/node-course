const express = require('express');
const User = require('../models/user');
const authMiddleware = require('../middleware/auth');
const multer = require('multer');
const sharp = require('sharp');

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

    return res.send({ user, token});
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.post('/logout', authMiddleware, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();

    return res.send();
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.post('/logoutAll', authMiddleware, async (req, res) => {
  try {
    req.user.tokens = [];

    await req.user.save();

    return res.send();
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.get('/me', authMiddleware, async (req, res) => {
    return res.send(req.user);
});

router.patch('/me', authMiddleware, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every((el) => allowedUpdates.includes(el));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid Fields' });
  }

  try {
    updates.forEach((update) => req.user[update] = req.body[update]);

    await req.user.save();

    return res.send(req.user);
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

router.delete('/me', authMiddleware, async (req, res) => {
  try {
    await req.user.remove();

    return res.send(req.user);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Only jpg, jpeg or png.'));
    }

    cb(undefined, true);
  }
});
router.post('/me/avatar', authMiddleware, upload.single('avatar'), async (req, res) => {
  const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();

  req.user.avatar = buffer;

  try {
    await req.user.save();

    return res.send();
  } catch (e) {
    return res.send(500).send({ error: e.message });
  }
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message });
});

router.get('/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set('Content-Type', 'image/png');
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

router.delete('/me/avatar', authMiddleware, async (req, res) => {
  try {
    req.user.avatar = undefined;

    await req.user.save();

    return res.send();
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
});

module.exports = router;
