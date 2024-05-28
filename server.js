require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const auth = require('./routes/auth');
const bcrypt = require('bcryptjs');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());
app.use('/api/users',userRoutes);
app.use('/api/event',eventRoutes);
app.use('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await user.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// app.post('/api/auth/signup', (req, res) => {
//   const { username, password, email } = req.body;
//   // Thực hiện logic đăng ký ở đây (ví dụ: lưu vào cơ sở dữ liệu)
//   res.status(201).json({ message: 'Signup successful', token: 'dummy-token' });
// });


const uri = process.env.MONGODB_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});
mongoose.connect(uri, options)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });
