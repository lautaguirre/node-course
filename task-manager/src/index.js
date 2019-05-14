const express = require('express');

// Connnect to DB
require('./db/mongoose');

// Routers
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3001;

// Parse to json
app.use(express.json());

// Routes
app.use('/users', userRouter);
app.use('/tasks', taskRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const bcrypt = require('bcrypt');

const runMe = async () => {
  const password = 'holanda123';
  const hash = await bcrypt.hash(password, 8);

  console.log(password);
  console.log(hash);

  console.log(await bcrypt.compare('holanda123', hash));
};

runMe();
