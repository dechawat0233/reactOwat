// Import dependencies
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');


// Set up environment variables

// Set up database connection
//mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: 
//true });
mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true, useUnifiedTopology: 
true });

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
//const userSchema = new mongoose.Schema({
//  username: { type: String, required: true, unique: true },
//  password: { type: String, required: true },
//});
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'employee', 'manager'],
    default: 'employee'
  }
});

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  }
});

const vaccinationSchema = new mongoose.Schema({
  vaccineName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  }
});

const treatmentRightsSchema = new mongoose.Schema({
  right: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

// Define the schema for the Employee
const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  nickName: {
    type: String,
  },
  sex: {
    type: String,
    enum: ['female', 'male', 'other'],
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  idCard: {
    type: String,
    required: true,
    unique: true
  },
  ethnicity: {
    type: String,
  },
  religion: {
    type: String,
  },
  maritalStatus: {
    type: String,
    enum: ['single', 'married', 'divorced', 'widowed', 'other']
  },
  militaryStatus: {
    type: String,
    enum: ['active', 'veteran', 'reserve', 'inactive', 'other']
  },
  address: {
    type: addressSchema,
    required: true
  },
  currentAddress: {
    type: addressSchema,
    required: true
  },
  phoneNumber: {
    type: String,
    match: /^[0-9]{10}$/ // Regular expression for 10-digit phone number
  },
  emergencyContactNumber: {
    type: String,
    match: /^[0-9]{10}$/ // Regular expression for 10-digit phone number
  },
  idLine: {
    type: String
  },
  vaccination: {
    type: vaccinationSchema
  },
  treatmentRights: [treatmentRightsSchema],

  position: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  }
});

// Create the Employee model based on the schema
const Employee = mongoose.model('Employee', employeeSchema);

//module.exports = Employee;

// Define user model
const User = mongoose.model('User', userSchema);

// Authenticate user and return JWT token
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = await req.body;
console.log(username  + ' ' + password );

  // Check if user exists
  const user = await User.findOne({ username });
  if (!user) {
    console.log('no user');
    return res.status(404).json({ error: 'User not found' });
  }

  // Check if password is correct
  // const passwordMatches = await bcrypt.compare(password, user.password);
  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    console.log('password can not Matches');
    return res.status(401).json({ error: 'Invalid password' });
  }

  // Generate and sign JWT token
  // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Generate and sign JWT token
  try {
    const userId = await user._id; // Replace with the actual user ID
    // const secretKey = process.env.JWT_SECRET; // Replace with your own secret key
    const secretKey = await 'Friendlydev'; // Replace with your own secret key
    const expiresIn = await '3h'; // Set the token expiration time
  console.log(secretKey );
    if (!secretKey) {
      throw new Error('Missing JWT secret key');
    }
  
    const token = await jwt.sign({ userId }, secretKey, { expiresIn });
    await res.json({ token });
    
    await console.log('Token:', token);
  } catch (error) {
    console.error('Error generating JWT token:', error.message);
  }
  
  
  // res.json({ token });
});


// Get list of users
//app.get('/api/users', jwtMiddleware, async (req, res) => {
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


// Get users
app.get('/api/user', async (req, res) => {
  const name = req.query.username;

  try {
    const users = await User.find({ username: { $regex: name, $options: 'i' } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
