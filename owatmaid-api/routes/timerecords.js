const connectionString = require('../config');

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
const workplaceTimerecordSchema = new mongoose.Schema({
  timerecordId: String,
  workplaceId: String,
  workplaceName: String,
  date: String,
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
    cashSalary: String,
    specialtSalary: String,
            messageSalary: String,
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
    cashSalary: String,
specialtSalary: String,
        messageSalary: String,
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

console.log(workplaceTimeRecordData.length);
    res.json(workplaceTimeRecordData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//======test 
router.get('/listempdelete', async (req, res) => {
  try {
    // Fetch the data first
    const workplaceTimeRecordData = await workplaceTimerecordEmp.find();

    // Delete all data
    await workplaceTimerecordEmp.deleteMany();

    // console.log(`Deleted ${workplaceTimeRecordData.length} records.`);
    res.json(workplaceTimeRecordData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/listdelete', async (req, res) => {

  try {
    // Fetch the data first
    const workplaceTimeRecordData = await workplaceTimerecord.find();

    // Delete all data
    await workplaceTimerecord.deleteMany();

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
      query.date= date;
    }
console.log('query.date ' + query.date);
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
      month,
      timerecordId} = req.body;

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

    if (timerecordId !== '') {
      //query.month = new Date(date);
      query.timerecordId = { $regex: new RegExp(timerecordId , 'i') };
    }

    console.log('Constructed Query:');
    console.log(query);

    if (employeeId == '' && employeeName == '' && month == '' && timerecordId == '') {
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
// router.post('/create', async (req, res) => {
  
//   const {
//     workplaceId,
//     workplaceName,
//     date,
//     employeeRecord
//   } = await req.body;
//   // console.log(date);

//   const currentDate = await new Date(date);
//   const currentYear = await currentDate.getFullYear();
//   const timerecordId = await currentYear;


//   // Create workplace
//   const workplaceTimeRecordData = await new workplaceTimerecord({
//     timerecordId,
//     workplaceId,
//     workplaceName,
//     date,
//     employeeRecord
//   });

//   try {
//     const ans = await workplaceTimeRecordData.save();
// if(ans){
//   console.log('create workplace time record success');
//       await setToEmployee(workplaceId, workplaceName, date, employeeRecord);

// }
//     await res.json(workplaceTimeRecordData);
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({ error: err.message });
//   }

// });


// Create new workplace
// router.post('/create', async (req, res) => {
//   try {
//     const {
//       workplaceId,
//       workplaceName,
//       date,
//       employeeRecord
//     } = req.body;

//     // Filter out employeeRecord objects where staffId is null
//     const filteredEmployeeRecord = employeeRecord.filter(record => record.staffId !== null);

//     const currentDate = new Date(date);
//     const currentYear = currentDate.getFullYear();
//     const timerecordId = currentYear;

//     // Create workplace with filtered employeeRecord array
//     const workplaceTimeRecordData = new workplaceTimerecord({
//       timerecordId,
//       workplaceId,
//       workplaceName,
//       date,
//       employeeRecord: filteredEmployeeRecord
//     });

//     const ans = await workplaceTimeRecordData.save();
//     if (ans) {
//       console.log('Create workplace time record success');
//       // Call your setToEmployee function here if needed
//     }

//     res.json(workplaceTimeRecordData);
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ error: err.message });
//   }
// });


// Create new employee timerecord 
router.post('/createemp', async (req, res) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  //const timerecordId = currentYear;

  const {
timerecordId,
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
console.log(workplaceTimeRecordData );

  try {
    await workplaceTimeRecordData.save();
    res.json(workplaceTimeRecordData);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }

});



// Update a workplaceTimeRecordData  by its workplaceTimeRecordData  
// router.put('/update/:workplaceRecordId', async (req, res) => {
//   const workplaceIdToUpdate = req.params.workplaceRecordId;
//   const updateFields = req.body;

//   try {
//     // Find the resource by ID and update it
//     const updatedResource = await workplaceTimerecord.findByIdAndUpdate(
//       workplaceIdToUpdate,
//       updateFields,
//       { new: true } // To get the updated document as the result
//     );
//     if (!updatedResource) {
//       return res.status(404).json({ message: 'Resource not found' });
//     }

//     // Send the updated resource as the response
//     res.json(updatedResource);


//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


// Update a employeeTimeRecordData  by its employeeTimeRecordData  
router.put('/updateemp/:employeeRecordId', async (req, res) => {
  const employeeIdToUpdate = req.params.employeeRecordId;
  const updateFields = req.body;

  try {
    // Find the resource by ID and update it
    const updatedResource = await workplaceTimerecordEmp.findByIdAndUpdate(
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


// async function setToEmployee(selectWorkplaceId , selectworkplaceName ,selectMonth , workplaceTimeRecordData ){
//   console.log('setToEmployee working');
// console.log(selectMonth );
// const dateParts = await selectMonth.split('/');
//   //set employee id and month of record
// const workplaceId = await selectWorkplaceId;
// const workplaceName = await selectworkplaceName;
//  const month =await dateParts[1];
//  const query = {};

// //  console.log(workplaceTimeRecordData );
// const timerecordId_year = await dateParts[2];
// const day  = await dateParts[0];
// await console.log('workplace ID: '+ workplaceId );
// await console.log('year '+ timerecordId_year );
// await console.log('month: '+ month);
// await console.log('day ' + day);

// await workplaceTimeRecordData.forEach(async element => {
//   // console.log(element['employeeRecord'] );
//   // console.log('========');

// //check emty from input record
//     if(element.staffId  !== ''){
// //       await console.log('employee: '+ element1.staffId);
// //       await console.log('month: '+ month)
// //       await console.log('========');

//       try {
//         //check employee timerecord from database
//          query.employeeId= await element.staffId;
//         query.month = await { $regex: new RegExp(month, 'i') };
        
//           const recordworkplace  = await workplaceTimerecordEmp.find(query);
//         // await console.log(recordworkplace  .length);

//         //check employee timerecord 
//         if(recordworkplace  .length > 0){
// // employee timerecord is created

// //update employeeTimerecord Data
// // await console.log('recordworkplace _id '+ recordworkplace[0]._id );

// //push data to employee_workplaceRecord in employee timerecord 

// await recordworkplace[0].employee_workplaceRecord.push({
//   'workplaceId': workplaceId,
//   'workplaceName': workplaceName,
//   'date':  day,
//   'shift': element.shift,
//   'startTime': element.startTime,
//   'endTime': element.endTime,
//   'allTime': element.allTime,
//   'otTime': element.otTime,
//   'selectotTime': element.selectotTime,
//   'selectotTimeOut': element.selectotTimeOut,
// });
// // await console.log(recordworkplace);

// const employeeIdToUpdate = await recordworkplace[0]._id;
// const updateFields = await recordworkplace;
// // await console.log('updateFields ' +updateFields );

// try {
//   // Find the resource by ID and update it

//   const updatedDocument = await workplaceTimerecordEmp.findByIdAndUpdate(
//     employeeIdToUpdate,
//     recordworkplace[0],
//     { new: true } // Return the updated document
//   );

//   if (updatedDocument) {
//     console.log('Document updated successfully.');
//     // res.json(updatedDocument);
//   } else {
//     console.log('Document not found.');
//     // res.status(404).json({ error: 'Document not found' });
//   }


// } catch (error) {
//   console.error('error '+ error);
// }

// //
//         } else {
//           // employee timerecord is no data
//             const timerecordId = await timerecordId_year ;
//             const employeeId = await element.staffId;
//             const  employeeName = element.staffName;
//             const  month = await dateParts[1];
//             const employee_workplaceRecord = {
//               'workplaceId': workplaceId,
//               'workplaceName': workplaceName,
//               'date': day,
//               'shift': element.shift,
//               'startTime': element.startTime,
//               'endTime': element.endTime,
//               'allTime': element.allTime,
//               'otTime': element.otTime,
//               'selectotTime': element.selectotTime,
//               'selectotTimeOut': element.selectotTimeOut,
//             };
      
//           // Create employee record
//           const workplaceTimeRecordData = await new workplaceTimerecordEmp({
//             timerecordId,
//             employeeId,
//             employeeName,
//             month,
//             employee_workplaceRecord
//           });
// // console.log(workplaceTimeRecordData );        

//           try {
//             await workplaceTimeRecordData.save();
//             // res.json(workplaceTimeRecordData);
//           } catch (err) {
//             await console.log(err);
//             // res.status(400).json({ error: err.message });
//           }
        
        
//         }
//        } catch (error) {
//          console.error(error);
//        }
      
//     } //end if


// }); //end  loop

// //end function
// }


async function setToEmployee(selectWorkplaceId, selectworkplaceName, selectMonth, workplaceTimeRecordData) {
  console.log('setToEmployee working');
  const dateParts = selectMonth.split('/');
  const workplaceId = selectWorkplaceId;
  const workplaceName = selectworkplaceName;
  const month = dateParts[1];
  const day = dateParts[0];

  for (const element of workplaceTimeRecordData) {
    if (element.staffId !== '') {
      try {
        const timerecordId_year = dateParts[2];
        const timerecordId = timerecordId_year;

        const query = {
          timerecordId : timerecordId,
          employeeId: element.staffId,
          month: { $regex: new RegExp(month, 'i') }
        };

        const recordworkplace = await workplaceTimerecordEmp.findOne(query);

        if (recordworkplace) {
          // Employee time record exists, update employee_workplaceRecord
          recordworkplace.employee_workplaceRecord.push({
            'workplaceId': workplaceId,
            'workplaceName': workplaceName,
            'date': day,
            'shift': element.shift,
            'startTime': element.startTime,
            'endTime': element.endTime,
            'allTime': element.allTime,
            'otTime': element.otTime,
            'selectotTime': element.selectotTime,
            'selectotTimeOut': element.selectotTimeOut,
            'cashSalary': element.cashSalary,
            'specialtSalary': element.specialtSalary,
                    'messageSalary': element.messageSalary,
          });

          await recordworkplace.save();
          console.log('Employee time record updated successfully.');
        } else {
          // Employee time record does not exist, create a new one
          const timerecordId_year = dateParts[2];
          const timerecordId = timerecordId_year;
          const employeeId = element.staffId;
          const employeeName = element.staffName;

          const employee_workplaceRecord = {
            'workplaceId': workplaceId,
            'workplaceName': workplaceName,
            'date': day,
            'shift': element.shift,
            'startTime': element.startTime,
            'endTime': element.endTime,
            'allTime': element.allTime,
            'otTime': element.otTime,
            'selectotTime': element.selectotTime,
            'selectotTimeOut': element.selectotTimeOut,
            'cashSalary': element.cashSalary,
            'specialtSalary': element.specialtSalary,
                    'messageSalary': element.messageSalary,
          };

          // Create new employee time record
          const newEmployeeTimeRecord = new workplaceTimerecordEmp({
            timerecordId,
            employeeId,
            employeeName,
            month,
            employee_workplaceRecord
          });

          await newEmployeeTimeRecord.save();
          console.log('New employee time record created successfully.');
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}

// Create new workplace
router.post('/create', async (req, res) => {
  try {
    const {
      workplaceId,
      workplaceName,
      date,
      employeeRecord
    } = req.body;

    // Filter out employeeRecord objects where staffId is null
    const filteredEmployeeRecord = employeeRecord.filter(record => record.staffId !== '');

    const currentDate = new Date(date);
    const currentYear = currentDate.getFullYear();
    const timerecordId = currentYear;

    // Create workplace with filtered employeeRecord array
    const workplaceTimeRecordData = new workplaceTimerecord({
      timerecordId,
      workplaceId,
      workplaceName,
      date,
      employeeRecord: filteredEmployeeRecord
    });

    const ans = await workplaceTimeRecordData.save();
    if (ans) {
      console.log('Create workplace time record success');
      await setToEmployee(workplaceId, workplaceName, date, filteredEmployeeRecord);
    }

    res.json(workplaceTimeRecordData);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});


// Update existing records in workplaceTimerecordEmp
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

    // Update records in workplaceTimerecordEmp using setToEmployee with updateRecord set to true
    await setToEmployee(updatedResource.workplaceId, updatedResource.workplaceName, updatedResource.date, updatedResource.employeeRecord, true);

    // Send the updated resource as the response
    res.json(updatedResource);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/updateemp/:employeeId/timerecord/:recordId', async (req, res) => {
  const { employeeId, recordId } = req.params;
  const updatedRecord = req.body;

  try {
    // Find the employee's timerecord by employeeId and recordId
    const result = await workplaceTimerecordEmp.findOneAndUpdate(
      { employeeId, 'employee_workplaceRecord._id': recordId },
      {
        $set: {
          'employee_workplaceRecord.$.workplaceId': updatedRecord.workplaceId,
          'employee_workplaceRecord.$.workplaceName': updatedRecord.workplaceName,
          // Add other fields that you want to update
        }
      },
      { new: true } // Returns the updated document
    );

    if (!result) {
      return res.status(404).json({ message: 'Time record not found' });
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update existing records in workplaceTimerecordEmp
// router.put('/updateemp/:timeRecord_id', async (req, res) => {
//   const workplaceIdToUpdate = req.params.employeeRecordId;
//   const updateFields = req.body;

//   try {
//     // Find the resource by ID and update it
//     const updatedResource = await workplaceTimerecordEmp.findByIdAndUpdate(
//       workplaceIdToUpdate ,
//       updateFields,
//       { new: true } // To get the updated document as the result
//     );
//     if (!updatedResource) {
//       return res.status(404).json({ message: 'Resource not found' });
//     }

//     // Update records in workplaceTimerecordEmp using setToEmployee with updateRecord set to true
//     await setToEmployee(updatedResource.employeeId, updatedResource.employeeName , updatedResource.month , updatedResource.employee_workplaceRecord , true);

//     // Send the updated resource as the response
//     res.json(updatedResource);

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


module.exports = router;
