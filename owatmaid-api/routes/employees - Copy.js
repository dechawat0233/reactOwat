const connectionString = require('../config');

var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

//Connect mongodb
mongoose.connect(connectionString ,{ useNewUrlParser: true, useUnifiedTopology: 
true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Define employee schema
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


// Get list of employees
  router.get('/list',  async (req, res) => {
    const employees = await Employee.find();
    res.json(employees);
  });
  
// Create new employee
router.post('/create', async (req, res) => {
  
  const {
employeeId,
name,
lastName,
nickName,
sex,
dateOfBirth,
age,
idCard,
ethnicity,
religion,
maritalStatus,
militaryStatus,
address,
currentAddress,
phoneNumber,
emergencyContactNumber,
idLine,
vaccination,
treatmentRights,
position,
department,
salary
       } = req.body;
  console.log(`Name: ${name}, Id card: ${idCard}`);
  
  // Create employee
  const employee = new Employee({ 
employeeId,
name,
lastName,
nickName,
sex,
dateOfBirth,
age,
idCard,
ethnicity,
religion,
maritalStatus,
militaryStatus,
address,
currentAddress,
phoneNumber,
emergencyContactNumber,
idLine,
vaccination,
treatmentRights,
position,
department,
salary
    });

  try {
    await employee.save();
    res.json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
 
});


module.exports = router;
