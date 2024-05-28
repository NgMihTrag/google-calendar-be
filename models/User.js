const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
// models/user.js

// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
  // name: { type: String, required: true },
  // email: { type: String, required: true, unique: true },
  // age: { type: Number, required: true }
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;
