// routes/auth.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Route để xác thực đăng nhập
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Tìm người dùng trong cơ sở dữ liệu
    const user = await User.findOne({ username });

    // Kiểm tra nếu người dùng không tồn tại
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // So sánh mật khẩu đã hash từ yêu cầu đăng nhập với mật khẩu trong cơ sở dữ liệu
    const passwordMatch = await bcrypt.compare(password, user.password);

    // Kiểm tra mật khẩu
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Nếu mọi thứ hợp lệ, trả về thông tin người dùng
    res.json(user);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
