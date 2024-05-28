// const express = require('express');
// const User = require('../models/User');
// const router = express.Router();

// router.post('/users', async (req, res) => {
//   try {
//     const user = new User(req.body);
//     await user.save();
//     res.status(201).send(user);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// router.get('/users', async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.send(users);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Route để tạo người dùng mới
router.post('/', async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    //  email: req.body.email
  });
  try {
    const result = await user.save();
    res.send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Route để lấy danh sách người dùng
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
