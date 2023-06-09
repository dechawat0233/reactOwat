const connectionString = 'mongodb://localhost:27017/users';

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
  discription: {
    type: String,
    required: true
  },
 subDistrict : {
    type: String
  },
  district: {
    type: String
  },
  province: {
    type: String
  },
  state: {
    type: String
  },
  postalCode: {
    type: String
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
    type: String
  },
  description: {
    type: String
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
  gender: {
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
    type: String
  },
  department: {
    type: String
  },
  salary: {
    type: Number
  }
});

// Create the Employee model based on the schema
const Employee = mongoose.model('Employee', employeeSchema);

async function insertEmp() {
  
  const empData = await  [{
'employeeId': '1001',
'name': 'วสันต์',
'lastName': 'แปงปวนจู',
'nickName': 'วสัน',
'gender': 'male',
'dateOfBirth': new Date('1991-10-03'),
'age': 31,
'idCard': '1234567890123',
'ethnicity': 'ไทย',
'religion': 'พุทธ',
'maritalStatus': 'married',
'militaryStatus': 'ยกเว้น',
'address': {
'discription': '251/124 Rich park terminal พหล59 ถนน พหลโยธิน',
'subDistrict': 'อนุสาวรีย์',
'district': 'บางเขน',
'province': 'กรุงเทพฯ',
'state': 'ไทย',
'postalCode': '10220'
},
'currentAddress': {
'discription': '251/124 Rich park terminal พหล59 ถนน พหลโยธิน',
'subDistrict': 'อนุสาวรีย์',
'district': 'บางเขน',
'province': 'กรุงเทพฯ',
'state': 'ไทย',
'postalCode': '10220'
},
'phoneNumber': '0853568570',
'emergencyContactNumber': '0815595303',
'idLine': 'Wasan2274',
}];

  // Create employee
  const employee = new Employee( empData );

  try {
    await employee.save();
console.log('insert success');
  } catch (err) {
console.log(err);
  }
 
}

insertEmp();