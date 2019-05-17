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

const Task = require('./models/task');
const User = require('./models/user');

const main = async () => {
  // const task = await Task.findById('5cddfd5004ed2111ccc5a977');
  // await task.populate('owner').execPopulate();
  // console.log(task);

  const user = await User.findById('5cddfd4804ed2111ccc5a975');
  await user.populate('tasks').execPopulate();
  console.log(user.tasks);
};

main();
