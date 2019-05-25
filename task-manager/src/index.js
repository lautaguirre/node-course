const express = require('express');

// Connnect to DB
require('./db/mongoose');

// Routers
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT;

// Parse to json
app.use(express.json());

// Routes
app.use('/users', userRouter);
app.use('/tasks', taskRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
