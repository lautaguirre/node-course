const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true,
});

// const User = mongoose.model('User', {
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     lowercase: true,
//     validate(value) {
//       if (!validator.isEmail(value)) throw new Error('Email is invalid');
//     }
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 7,
//     trim: true,
//     validate(value) {
//       if (value.toLowerCase().includes('password')) throw new Error('Cannot be password');
//     }
//   },
//   age: {
//     type: Number,
//     default: 0,
//     validate(value) {
//       if (value < 0) throw new Error('Age must be positive');
//     },
//   },
// });

// const me = new User({
//   name: '  Sergio  ',
//   email: 'MYEMAIL@email.COM   ',
//   password: 'pasda '
// });

// me.save().then((res) => {
//   console.log(res);
// }).catch((error) => {
//   console.log(error);
// });

const Task = mongoose.model('Task', {
  description: {
    type: String,
    trim: true,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  }
});

const task = new Task({
  description: 'Hola',
  completed: true,
});

task.save().then(res => {
  console.log(res);
}).catch(error => {
  console.log(error);
});
