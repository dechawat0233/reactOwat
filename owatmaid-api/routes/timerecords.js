const connectionString = require('../config');

var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const { format } = require('date-fns');


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
    date: String,
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
  try {
    // Fetch the data first
    const workplaceTimeRecordData = await workplaceTimerecordEmp.find();

    // Delete all data
    // await workplaceTimerecordEmp.deleteMany();

    // console.log(`Deleted ${workplaceTimeRecordData.length} records.`);
    res.json(workplaceTimeRecordData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Get  workplace time record by WorkplaceTimeRecord Id
router.get('/:workplaceTimeRecordId', async (req, res) => {
  try {
    const workplaceTimeRecordData = await workplaceTimerecord.findOne({ workplaceTimeRecordId: req.params.workplaceTimeRecordId });

    if (workplaceTimeRecordData) {
      res.json(workplaceTimeRecordData );
    } else {
      res.status(404).json({ error: 'workplace not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }

});



// Get  employee time record by employeeTimeRecord Id
router.get('/searchid/:employeeTimeRecordId', async (req, res) => {
  try {
    const employeeTimeRecordData = await workplaceTimerecordEmp.findOne({ employeeTimeRecordId: req.params.employeeTimeRecordId});
    if (workplaceTimeRecordData) {
      res.json(employeeTimeRecordData);
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

    // console.log('Constructed Query:');
    // console.log(query);

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


//search employee timerecord 
router.post('/searchemp', async (req, res) => {
  try {
    const { employeeId,
      employeeName,
      month} = req.body;

    // Construct the search query based on the provided parameters
    const query = {};

    if (employeeId !== '') {
      query.employeeId= employeeId;
    }


    if (employeeName !== '') {
      query.employeeName = { $regex: new RegExp(employeeName, 'i') };
    }

    if (month !== '') {
      //query.month = new Date(date);
      query.month = { $regex: new RegExp(month , 'i') };
    }

    console.log('Constructed Query:');
    console.log(query);

    if (employeeId == '' && employeeName == '' && month == '') {
      res.status(200).json({});
    }

    // Query the workplace collection for matching documents
    const recordworkplace  = await workplaceTimerecordEmp.find(query);

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
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const timerecordId = currentYear;
  
  const {
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
    // setToEmployee(id , month);
    await setToEmployee(workplaceId, workplaceName, formatDateToYYYYMMDD(date) , employeeRecord);

    res.json(workplaceTimeRecordData);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }

});


// Create new employee timerecord 
router.post('/createemp', async (req, res) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const timerecordId = currentYear;

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


// Update a employeeTimeRecordData  by its employeeTimeRecordData  
router.put('/updateemp/:employeeRecordId', async (req, res) => {
  const employeeIdToUpdate = req.params.employeeRecordId;
  const updateFields = req.body;

  try {
    // Find the resource by ID and update it
    const updatedResource = await employeeTimerecord.findByIdAndUpdate(
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


async function setToEmployee(selectWorkplaceId , selectworkplaceName ,selectMonth , workplaceTimeRecordData ){
  console.log('setToEmployee working');
  const currentDate = await new Date();
  const currentYear = await currentDate.getFullYear();
  const timerecordId_year = await currentYear;

  //set employee id and month of record
const workplaceId = await selectWorkplaceId;
const workplaceName = await selectworkplaceName;
 const month =await selectMonth;
 const query = {};

//  console.log(workplaceTimeRecordData );
const date = await new Date(month);
const monthIndex = await date.getMonth();
const month2 = await (monthIndex + 1).toString().padStart(2, '0');
await console.log('workplace ID: '+ workplaceId );
await console.log('month: '+ month2);

await workplaceTimeRecordData.forEach(async element => {
  // console.log(element['employeeRecord'] );
  // console.log('========');

//check emty from input record
    if(element.staffId  !== ''){
//       await console.log('employee: '+ element1.staffId);
//       await console.log('month: '+ month2)
//       await console.log('========');

      try {
        //check employee timerecord from database
         query.employeeId= await element.staffId;
        query.month = await { $regex: new RegExp(month2, 'i') };
        
          const recordworkplace  = await workplaceTimerecordEmp.find(query);
        // await console.log(recordworkplace  .length);

        //check employee timerecord 
        if(recordworkplace  .length > 0){
// employee timerecord is created

//update employeeTimerecord Data
await console.log('recordworkplace _id '+ recordworkplace[0]._id );

//push data to employee_workplaceRecord in employee timerecord 
const timerecordId = await timerecordId_year ;
await recordworkplace[0].push({
  'timerecordId': timerecordId,
});

await recordworkplace[0].employee_workplaceRecord.push({
  'workplaceId': workplaceId,
  'workplaceName': workplaceName,
  'date':   String(date.getDate()).padStart(2, '0') ,
  'shift': element.shift,
  'startTime': element.startTime,
  'endTime': element.endTime,
  'allTime': element.allTime,
  'otTime': element.otTime,
  'selectotTime': element.selectotTime,
  'selectotTimeOut': element.selectotTimeOut,
});
await console.log(recordworkplace);

const employeeIdToUpdate = await recordworkplace[0]._id;
const updateFields = await recordworkplace;
await console.log('updateFields ' +updateFields );

try {
  // Find the resource by ID and update it

  const updatedDocument = await workplaceTimerecordEmp.findByIdAndUpdate(
    employeeIdToUpdate,
    recordworkplace[0],
    { new: true } // Return the updated document
  );

  if (updatedDocument) {
    console.log('Document updated successfully.');
    // res.json(updatedDocument);
  } else {
    console.log('Document not found.');
    // res.status(404).json({ error: 'Document not found' });
  }


} catch (error) {
  console.error('error '+ error);
}

//
        } else {
          // employee timerecord is no data
            const timerecordId = await timerecordId_year ;
            const employeeId = await element.staffId;
            const  employeeName = element.staffName;
            const  month = await month2;
            const employee_workplaceRecord = {
              'workplaceId': workplaceId,
              'workplaceName': workplaceName,
              'date':   String(date.getDate()).padStart(2, '0') ,
              'shift': element.shift,
              'startTime': element.startTime,
              'endTime': element.endTime,
              'allTime': element.allTime,
              'otTime': element.otTime,
              'selectotTime': element.selectotTime,
              'selectotTimeOut': element.selectotTimeOut,
            };
      
          // Create employee record
          const workplaceTimeRecordData = await new workplaceTimerecordEmp({
            timerecordId,
            employeeId,
            employeeName,
            month,
            employee_workplaceRecord
          });
// console.log(workplaceTimeRecordData );        

          try {
            await workplaceTimeRecordData.save();
            // res.json(workplaceTimeRecordData);
          } catch (err) {
            await console.log(err);
            // res.status(400).json({ error: err.message });
          }
        
        
        }
       } catch (error) {
         console.error(error);
       }
      
    } //end if


}); //end  loop

//end function
}


const formatDateToYYYYMMDD = (date) => {
  return format(date, 'yyyy/MM/dd');
};

module.exports = router;
