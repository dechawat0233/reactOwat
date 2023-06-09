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
const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: String
  },
  name: {
    type: String
  },
  lastName: {
    type: String
  },
  nickName: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['female', 'male', 'other'],
  },
  dateOfBirth: {
    type: Date
  },
  age: {
    type: Number
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
    type: String
  },
  currentAddress: {
    type: String
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
    type: String
  },
  treatmentRights: {
    type: String
  },
  position: {
    type: String
  },
  department: {
    type: String
  }
});

// Create the Employee model based on the schema
const Employee = mongoose.model('Employee', employeeSchema);


// Get list of employees
  router.get('/list',  async (req, res) => {
    const employees = await Employee.find();
    res.json(employees);
  });

  // Get  employee by Id
  router.get('/:employeeId',  async (req, res) => {
      try {
        const employee = await Employee.findOne({ employeeId: req.params.employeeId });
        if (employee) {
          res.json(employee);
        } else {
          res.status(404).json({ error: 'Employee not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    
  });

// Create new employee
router.post('/create', async (req, res) => {
  
  const {
    employeeId ,
    name,
    lastName,
    nickName,
    gender,
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
    department
       } = req.body;
  console.log(`Name: ${name}, Id card: ${idCard}`);

//example data
/*
  let employeeId  = '1001';
  let name ='วสันต์';
  let lastName= 'แปงปวนจู';
  let nickName = 'สันต์';
  let gender= 'male';
  let dateOfBirth = new Date("1991/10/03");
  let age= 31;
  let idCard = '1234567890123';
  let ethnicity = 'ไทย';
  let religion= 'พุทธ';
  let maritalStatus = 'married';
  let militaryStatus = 'other';
  let address = '251/124 Rich park terminal พหล 59 ';
  let currentAddress = '251/124 Rich park terminal พหล 59 ';
  let phoneNumber = '0853568570';
  let emergencyContactNumber = '0853568570';
  let idLine = 'Wasan2274';
  let vaccination = '';
  let treatmentRights = '';
  let position = '';
  let department = '';
  */

  // Create employee
  const employee = new Employee({ 
    employeeId ,
    name,
    lastName,
    nickName,
    gender,
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
    department
    });

  try {
    await employee.save();
    res.json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
 
});


module.exports = router;
