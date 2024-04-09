const connectionString = require('../config');
const sURL = 'http://localhost:3000';

const axios = require('axios');

var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const { months } = require('moment');


//Connect mongodb
mongoose.connect(connectionString, {
  useNewUrlParser: true, useUnifiedTopology:
    true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Define time record schema for workplace
const concludeSchema = new mongoose.Schema({
  year: String,
  month: String,
  concludeDate: String,
  employeeId: String,
concludeRecord: [{ 
  day: String, 
  workplaceId: String, 
  allTimes: String, 
  workRate: String, 
  otTimes: String, 
  workRateOT: String, 
  addSalaryDay: String,
  addSalary: [{
    id: String,
    name: String,
    SpSalary: String,
    roundOfSalary: String,
    StaffType: String,
    nameType: String,
    message: String,
  }]
}],
createBy: String
});

// Create the conclude record time model based on the schema
const conclude = mongoose.model('conclude', concludeSchema );


// Get list of conclude 
router.get('/list', async (req, res) => {

  const concludeData = await conclude.find();
  res.json(concludeData );
});

router.get('/listdelete', async (req, res) => {

  try {
    // const concludeData = await conclude.find();
    await conclude.deleteMany();
    const concludeData = await conclude.find();

    res.json(concludeData );
  
    // const concludeData = await Conclude.find();

    // Delete all documents in the collection
    // await Conclude.deleteMany();

    // Respond with the fetched data
    // res.json(concludeData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Get  conclude record by conclude Id
router.get('/:employeeId', async (req, res) => {
  try {
    const concludeData = await conclude.findOne({ employeeId: req.params.employeeId});

    if (concludeData ) {
      res.json(concludeData );
    } else {
      res.status(404).json({ error: 'workplace not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }

});


// Get  conclude record by conclude Id
router.post('/search', async (req, res) => {
  try {
    const { 
      year,
      month,
      concludeDate,
      employeeId } = req.body;

    // Construct the search query based on the provided parameters
    const query = {};

    if (employeeId !== '') {
      query.employeeId = employeeId ;
    }

    if (year !== '') {
      query.year = year;
      // query.year= { $regex: new RegExp(workplaceName, 'i') };
    }

    if (month !== '') {
      query.month = month;
    }
    if (concludeDate !== '') {
      query.concludeDate = concludeDate;
    }

// console.log('query.date ' + query.date);
    // console.log('Constructed Query:');
    // console.log(query);

    if (month== '' && year == '' && employeeId== '') {
      res.status(200).json({});
    }

    // Query the workplace collection for matching documents
    const recordConclude  = await conclude.find(query);

    // await console.log('Search Results:');
    // await console.log(recordworkplace  );
    let textSearch = 'conclude';
    await res.status(200).json({ recordConclude  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Create new conclude
router.post('/create', async (req, res) => {
  const { 
    year,
    month,
    concludeDate,
    employeeId,
    createBy,
    concludeRecord } = req.body;


  try {
      //create conclude record
      const recordConclude = new conclude({
        year,
        month,
        concludeDate,
        employeeId,
        concludeRecord,
        createBy });

    const ans = await recordConclude .save();
    if (ans) {
      console.log('Create workplace time record success');
    }

    res.json(recordConclude );
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});


// Update existing records in workplaceTimerecordEmp
router.put('/update/:concludeRecordId', async (req, res) => {
  const concludeIdToUpdate = req.params.concludeRecordId;
  const updateFields = req.body;

  try {
    // Find the resource by ID and update it
    const updatedResource = await conclude.findByIdAndUpdate(
      concludeIdToUpdate,
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


// Auto Create new conclude
router.post('/autocreate', async (req, res) => {
const workplaceList = await [];

  const { 
    year,
    month,
    // concludeDate,
    employeeId,
    createBy,
    // concludeRecord 
  } = await req.body;

  try {
    const workplaceResult = await axios.get(sURL + '/workplace/list');
    await console.log(JSON.stringify(workplaceResult.data[0].workTimeDay ) );
    const dataTest = await {
      timerecordId: "2024", 
          month: "03",
          employeeId : "1001"
        };
        // const x = await axios.post(sURL + '/timerecord/searchemp', dataTest);
// console.log(JSON.stringify(x,null,2));    
    
  } catch (e) {
    await console.log(e);
  }
  
  

  // try {
  //     //create conclude record
  //     const recordConclude = new conclude({
  //       year,
  //       month,
  //       concludeDate,
  //       employeeId,
  //       concludeRecord,
  //       createBy });

  //   const ans = await recordConclude .save();
  //   if (ans) {
  //     console.log('Create workplace time record success');
  //   }

  //   res.json(recordConclude );
  // } catch (err) {
  //   console.error(err);
  //   res.status(400).json({ error: err.message });
  // }
});



module.exports = router;
