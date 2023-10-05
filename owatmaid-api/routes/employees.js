const connectionString = require('../config');

var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

//Connect mongodb
mongoose.connect(connectionString, {
  useNewUrlParser: true, useUnifiedTopology:
    true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Define employee schema
const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true
  },
  position: {
    type: String
  },
  department: {
    type: String
  },
  workplace: {
    type: String
  },
  jobtype: {
    type: String
  },
  startjob: {
    type: String
  },
  endjob: {
    type: String
  },
  exceptjob: {    type: String
  },
  prefix: {
    type: String
  },
  name: {
    type: String //// use SocialSecurity
  },
  lastName: {
    type: String //// use SocialSecurity
  },
  nickName: {
    type: String,
  },
  gender: {
    type: String
  },
  dateOfBirth: {
    type: Date
  },
  age: {
    type: Number
  },
  idCard: {
    type: String,
    required: true,  //// use SocialSecurity
    unique: true
  },
  ethnicity: {
    type: String,
  },
  religion: {
    type: String,
  },
  maritalStatus: {
    type: String
  },
  militaryStatus: {
    type: String
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
  vaccination: [],
  treatmentRights: {
    type: String
  },
  startcount: String,
  salary: String,  //// use SocialSecurity
  salarytype: String,
  money: String,
  salaryupdate: Date,
  salaryout: String,
  salarypayment: String,
  salarybank: String,
  banknumber: String,

  salaryadd1: String,
  salaryadd1v: String,
  salaryadd2: String,
  salaryadd2v: String,
  salaryadd3: String,
  salaryadd3v: String,
  salaryadd4: String,
  salaryadd4v: String,
  salaryadd5: String,
  salaryadd5v: String,
  salaryaddtype: String,
  ///socielsecurity
  salaryadd1Sec: String,
  salaryadd2Sec: String,
  salaryadd3Sec: String,
  salaryadd4Sec: String,
  salaryadd5Sec: String,

  remainbusinessleave: String,
  businessleavesalary: String,
  remainsickleave: String,
  sickleavesalary: String,
  remainvacation: String,
  maternityleave: String,
  maternityleavesalary: String,
  vacationsalary: String,
  militaryleave: String,
  militaryleavesalary: String,
  sterilization: String,
  sterilizationsalary: String,
  leavefortraining: String,
  leavefortrainingsalary: String,

  SocialSecurityCheck: String,
  selectedOption: String,
  idPerson: String,
  salary: String,
  minus: String,
  socialsecurity: String,
  socialsecurityemployer: String,
  minusemployer: String,

  selectedHospDFSelect: String,
  selectedHospSelect1: String,
  selectedHospSelect2: String,
  selectedHospSelect3: String,

  selectedHospDf: String,
  selectedHosp1: String,
  selectedHosp2: String,
  selectedHosp3: String,
  beforebecomeEmployee: String,
  wagesbeforeusingProgram: String,
  wagesafterusingProgram: String,
  companybeforeusingProgram: String,
  ////otherExp
  number1: String,
  number2: String,

  input1: String,
  input2: String,
  input3: String,
  anything: String,

  crimeinvestigation: String,
  shirt: String,
  shirtcount: String,
  trousers: String,
  trouserscount: String,
  wholeset: String,
  wholesetcount: String,
  saveftyShoes: String,
  saveftyShoescount: String,
  apron: String,
  aproncount: String,
  hat: String,
  hatcount: String,
  custom: String,

  admoney1: String,
  admoney2: String,
  admoney3: String,

  commentadmoney1: String,
  commentadmoney2: String,
  commentadmoney3: String,
  PriceType: String,
  divide: String,

  addSalary: [{
    name: String,
    SpSalary: String,
    roundOfSalary: String,
    StaffType: String,
    nameType: String,
}],

});

// Create the Employee model based on the schema
const Employee = mongoose.model('Employee', employeeSchema);


// Get list of employees
router.get('/list', async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

// Get  employee by Id
router.get('/:employeeId', async (req, res) => {
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


router.post('/search', async (req, res) => {
  try {
    const { employeeId, name, idCard, workPlace } = req.body;

    // Construct the search query based on the provided parameters
    const query = {};

    if (employeeId) {
      query.employeeId = employeeId;
    }

    if (name) {
      query.name = { $regex: new RegExp(name, 'i') };
      //{ $regex: name, $options: 'i' };
    }

    if (idCard) {
      query.idCard = idCard;
    }

    if (workPlace) {
      query.workPlace = { $regex: workPlace, $options: 'i' };
    }

    console.log('Search Parameters:');
    console.log({ employeeId, name, idCard, workPlace });

    console.log('Constructed Query:');
    console.log(query);
    if (employeeId == '' && name == '' && idCard == '' && workPlace == '') {
      res.status(200).json({});
    }

    // Query the employee collection for matching documents
    const employees = await Employee.find(query);

    console.log('Search Results:');
    console.log(employees);
    let textSearch = 'test';
    res.status(200).json({ employees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Create new employee
router.post('/create', async (req, res) => {

  const {
    employeeId,
    position,
    department,
    workplace,
    jobtype,
    startjob,
    endjob,
    exceptjob,
    prefix,
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

    selectedOption,
    idPerson,
    salary,
    minus,
    socialsecurity,
    socialsecurityemployer,
    minusemployer,

    selectedHospDFSelect,
    selectedHospSelect1,
    selectedHospSelect2,
    selectedHospSelect3,

    selectedHospDf,
    selectedHosp1,
    selectedHosp2,
    selectedHosp3,

    beforebecomeEmployee,
    wagesbeforeusingProgram,
    wagesafterusingProgram,
    companybeforeusingProgram,

    salaryadd1Sec,
    salaryadd2Sec,
    salaryadd3Sec,
    salaryadd4Sec,
    salaryadd5Sec,

    ////otherExp
    number1,
    number2,

    input1,
    input2,
    input3,
    anything,

    crimeinvestigation,
    shirt,
    shirtcount,
    trousers,
    trouserscount,
    wholeset,
    wholesetcount,
    saveftyShoes,
    saveftyShoescount,
    apron,
    aproncount,
    hat,
    hatcount,
    custom,

    admoney1,
    admoney2,
    admoney3,

    commentadmoney1,
    commentadmoney2,
    commentadmoney3,
    PriceType,
    divide,

    addSalary,
  } = req.body;
  console.log(`Name: ${name}, Id card: ${idCard}`);


  // Create employee
  const employee = new Employee({
    employeeId,
    position,
    department,
    workplace,
    jobtype,
    startjob,
    endjob,
    exceptjob,
    prefix,
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

    selectedOption,
    idPerson,
    salary,
    minus,
    socialsecurity,
    socialsecurityemployer,
    minusemployer,

    selectedHospDFSelect,
    selectedHospSelect1,
    selectedHospSelect2,
    selectedHospSelect3,

    selectedHospDf,
    selectedHosp1,
    selectedHosp2,
    selectedHosp3,

    beforebecomeEmployee,
    wagesbeforeusingProgram,
    wagesafterusingProgram,
    companybeforeusingProgram,

    salaryadd1Sec,
    salaryadd2Sec,
    salaryadd3Sec,
    salaryadd4Sec,
    salaryadd5Sec,

    ////otherExp
    number1,
    number2,

    input1,
    input2,
    input3,
    anything,

    crimeinvestigation,
    shirt,
    shirtcount,
    trousers,
    trouserscount,
    wholeset,
    wholesetcount,
    saveftyShoes,
    saveftyShoescount,
    apron,
    aproncount,
    hat,
    hatcount,
    custom,

    admoney1,
    admoney2,
    admoney3,

    commentadmoney1,
    commentadmoney2,
    commentadmoney3,
    PriceType,
    divide,
    addSalary,
  });

  try {
    await employee.save();
    res.json(employee);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }

});


//Update Employee data
router.put('/update/:_id', async (req, res) => {
  const employeeIdToUpdate = req.params._id;
  const updateFields = req.body;

  try {
    // Find the resource by ID and update it
    const updatedResource = await Employee.findByIdAndUpdate(
      employeeIdToUpdate,
      updateFields,
      { new: true } // To get the updated document as the result
    );
    if (!updatedResource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    // Send the updated resource as the response
    res.json(updatedResource);


  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
