// Import dependencies
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Set up environment variables
//require('dotenv').config();

// Set up database connection
//mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: 
//true });

// mongoose.connect('mongodb://172.17.0.2:27017/users', { useNewUrlParser: true, useUnifiedTopology: 
// true });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const username = 'admin';
const password = 'friendlydev214';
const host = '172.17.0.2';
const port = '27017';
// const database = 'users';
const database = 'admin';

const connectionString = `mongodb://${username}:${password}@${host}:${port}/${database}`;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Set up express app
const app = express();
app.use(express.json());
app.use(cors());

// Set up JWT middleware
const jwtMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decodedToken.userId;
      next();
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
  } else {
    res.status(401).json({ error: 'Token required' });
  }
};

// Define user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Define user model
const User = mongoose.model('User', userSchema);

// Authenticate user and return JWT token
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Check if password is correct
  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  // Generate and sign JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

// Get list of users
// app.get('/api/users', jwtMiddleware, async (req, res) => {
  app.get('/api/users',  async (req, res) => {

  const users = await User.find();
  res.json(users);
});

app.use(bodyParser.json());

// Create new user
app.post('/api/users', async (req, res) => {

    // const user = new User({ username: 'myusername', password: 'mypassword' });
  // user.save((err) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log('User saved successfully!');
  //   }
  // });


  const { username, password } = req.body;
  console.log(`Username: ${username}, Password: ${password}`);
  
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = new User({ username, password: hashedPassword });

  try {
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
 
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
