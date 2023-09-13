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


// Define time record schema for workplace
const workplaceTimerecordSchema = new mongoose.Schema({
  timerecordId: String,
  workplaceId: String,
  workplaceName: String,
  date: Date,
  employeeRecord: [{
    staffId: String,
    staffName: String,
    shift: String,
    startTime: String,
    endTime: String,
    allTime: String,
    otTime: String,
    selectotTime: String,
    selectotTimeOut: String,
  }]
});

// Create the workplace record time model based on the schema
const workplaceTimerecord = mongoose.model('workplaceTimerecord', workplaceTimerecordSchema);

// Define time record schema for employee
const employeeTimerecordSchema = new mongoose.Schema({
  timerecordId: String,
  employeeId: String,
  employeeName: String,
  month: String,
  employee_workplaceRecord: [{
    workplaceId: String,
    workplaceName: String,
    date: Date,
    shift: String,
    startTime: String,
    endTime: String,
    allTime: String,
    otTime: String,
    selectotTime: String,
    selectotTimeOut: String,
}]
});

// Create the workplace record time model based on the schema
const workplaceTimerecordEmp = mongoose.model('employeeTimerecord', employeeTimerecordSchema );




// Get list of workplaceTimerecords
router.get('/list', async (req, res) => {
  const workplaceTimeRecordData = await workplaceTimerecord.find();
  res.json(workplaceTimeRecordData);
});


// Get list of employeeTimerecords
router.get('/listemp', async (req, res) => {
  const workplaceTimeRecordData = await workplaceTimerecordEmp.find();
  res.json(workplaceTimeRecordData);
});

// Get  workplace time record by WorkplaceTimeRecord Id
router.get('/:workplaceTimeRecordId', async (req, res) => {
  try {
    const workplaceTimeRecordData = await workplaceTimerecord.findOne({ workplaceTimeRecordId: req.params.workplaceTimeRecordId });
    if (workplaceTimeRecordData) {
      res.json(workplaceTimeRecordData);
    } else {
      res.status(404).json({ error: 'workplace not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }

});


router.post('/search', async (req, res) => {
  try {
    const { workplaceId,
      workplaceName,
      date} = req.body;

    // Construct the search query based on the provided parameters
    const query = {};

    if (workplaceId !== '') {
      query.workplaceId = workplaceId;
    }


    if (workplaceName !== '') {
      query.workplaceName = { $regex: new RegExp(workplaceName, 'i') };
    }

    if (date !== '') {
      query.date= new Date(date);
    }

    console.log('Constructed Query:');
    console.log(query);

    if (workplaceId == '' && workplaceName == '' && date == '') {
      res.status(200).json({});
    }

    // Query the workplace collection for matching documents
    const recordworkplace  = await workplaceTimerecord.find(query);

    await console.log('Search Results:');
    await console.log(recordworkplace  );
    let textSearch = 'workplace';
    await res.status(200).json({ recordworkplace  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Create new workplace 
router.post('/create', async (req, res) => {

  const {
    timerecordId,
    workplaceId,
    workplaceName,
    date,
    employeeRecord
  } = req.body;


  // Create workplace
  const workplaceTimeRecordData = new workplaceTimerecord({
    timerecordId,
    workplaceId,
    workplaceName,
    date,
    employeeRecord
  });

  try {
    await workplaceTimeRecordData.save();
    res.json(workplaceTimeRecordData);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }

});


// Create new employee timerecord 
router.post('/createemp', async (req, res) => {

  const {
    employeeId,
    employeeName,
    month,
    employee_workplaceRecord
  } = req.body;


  // Create workplace
  const workplaceTimeRecordData = new workplaceTimerecordEmp({
    timerecordId,
    employeeId,
    employeeName,
    month,
    employee_workplaceRecord
  });

  try {
    await workplaceTimeRecordData.save();
    res.json(workplaceTimeRecordData);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }

});



// Update a workplaceTimeRecordData  by its workplaceTimeRecordData  
router.put('/update/:workplaceRecordId', async (req, res) => {
  const workplaceIdToUpdate = req.params.workplaceRecordId;
  const updateFields = req.body;

  try {
    // Find the resource by ID and update it
    const updatedResource = await workplaceTimerecord.findByIdAndUpdate(
      workplaceIdToUpdate,
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

