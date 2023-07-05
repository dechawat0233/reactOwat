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


// Define workplace schema
const workplaceSchema = new mongoose.Schema({
  workplaceId: {
    type: String,
    required: true,
    unique: true
  },
  workplaceName: {
    type: String
  },
  workplaceArea: {
    type: String
  },
  workOfWeek: {
    type: String
  },
  workkStart1: {
    type: String
  },
  workEnd1: {
    type: String
    },
    workkStart2: {
        type: String
    },
    workEnd2: {
        type: String
    },
    workkStart3: {
        type: String
    },
    workEnd3: {
        type: String
    },
  workOfHour: {
    type: String
  },
  workOfOT: {
    type: String
  },
  workRate: {
    type: String 
  },
  workRateOT: {
    type: String
  },
  workTotalPeople: {
    type: String,
  },
  workplaceAddress: {
    type: String
    },

});

// Create the workplace model based on the schema
const Workplace = mongoose.model('Workplace', workplaceSchema);


// Get list of workplaces
  router.get('/list',  async (req, res) => {
      const workplaces = await Workplace.find();
      res.json(workplaces);
  });

  // Get  workplace by Id
router.get('/:workplaceId',  async (req, res) => {
      try {
          const workplace = await Workplace.findOne({ workplaceId: req.params.workplaceId });
          if (workplace) {
              res.json(workplace);
        } else {
              res.status(404).json({ error: 'workplace not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    
  });


router.post('/search', async (req, res) => {
  try {
      const { workplaceId, workplaceName , workplaceArea } = req.body;

    // Construct the search query based on the provided parameters
    const query = {};

      if (workplaceId) {
          query.workplaceId = workplaceId;
    }

      if (workplaceName) {
          query.workplaceName = { $regex: new RegExp(workplaceName, 'i') };
//{ $regex: name, $options: 'i' };
    }

      if (workplaceArea) {
          query.workplaceArea = { $regex: workplaceArea, $options: 'i' };
    }

    console.log('Search Parameters:');
    console.log({ employeeId, name, idCard, workPlace });

    console.log('Constructed Query:');
    console.log(query);
      if (workplaceId == '' && workplaceName == '' && workplaceArea == ''){
    res.status(200).json({ });
}

    // Query the workplace collection for matching documents
      const workplaces = await Workplace.find(query);

    console.log('Search Results:');
      console.log(workplace);
      let textSearch = 'workplace';
      res.status(200).json({ workplace});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Create new workplace 
router.post('/create', async (req, res) => {
  
  const {
      workplaceId,
    position ,
     department ,
         workplace, 
    jobtype ,
    startjob,
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
   treatmentRights
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
     employeeId,
     position ,
      department ,
          workplace, 
     jobtype ,
     startjob,
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
    treatmentRights
    });

  try {
    await employee.save();
    res.json(employee);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
 
});


module.exports = router;
