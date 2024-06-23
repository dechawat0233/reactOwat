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
  workRateMultiply: String, 
  otTimes: String, 
  workRateOT: String, 
  workRateOTMultiply: String, 
  addSalaryDay: String
}],
addSalary: [
  ],
createBy: String
});

// Create the conclude record time model based on the schema
const conclude = mongoose.model('conclude', concludeSchema );


// router.get('/autocreate', async (req, res) => {
  router.post('/autocreate', async (req, res) => {
    const { 
      year ,
      month ,
      employeeId } = await req.body;
  
    
try {

  const dataConclude = {};
  const concludeRecord = [];
// const year = '2024';
// const month = '02';
// const employeeId = '1001';
const addSalaryDaily = [];

//get employee add salary data
const searchEmp = await {
  employeeId: employeeId, 
  name: '', 
  idCard: '', 
  workPlace: ''
};
const responseEmp = await axios.post(sURL + '/employee/search', searchEmp );
const dataEmp = await responseEmp.data;

  // console.log('*x ' + JSON.stringify(dataEmp.employees[0].addSalary ,null ,2) );
if(dataEmp.employees.length !== 0){
  await dataEmp.employees[0].addSalary.forEach(item => {
if(item.roundOfSalary == 'daily') {
// if(item.SpSalary > 100) {
//  item.SpSalary = Number(item.SpSalary ) / 30;
// }
addSalaryDaily.push(item);
}
  });
}
const addSalaryList = [];


  dataConclude.year = await year;
  dataConclude.month = await month;

  const today = await new Date();
const dd = await String(today.getDate()).padStart(2, '0');
const mm = await String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
const yyyy = await today.getFullYear();
const hh = await String(today.getHours()).padStart(2, '0');
const min = await String(today.getMinutes()).padStart(2, '0');
const concludeDate = await `${dd}-${mm}-${yyyy} ${hh}:${min}`;
await console.log(concludeDate); // Example output: "20-06-2024 14:30"

dataConclude.concludeDate = await concludeDate || '';
dataConclude.employeeId = await employeeId;

// data.concludeRecord.day = '';
// data.concludeRecord.workplaceId = '';
// data.concludeRecord.allTimes = '';
// data.concludeRecord.workRate = '';
// data.concludeRecord.workRateMultiply = '';
// data.concludeRecord.otTimes = '';
// data.concludeRecord.workRateOT = '';
// data.concludeRecord.workRateOTMultiply = '';
// data.concludeRecord.addSalaryDay = '';

// dataConclude.addSalary = [];

let year1 = await Number(year);
// Convert the month string to an integer
let monthInt = await parseInt(month, 10);

// Subtract one to get the previous month
let prevMonthInt = await monthInt - 1;

// Handle the case where the month is January
if (prevMonthInt === 0) {
  prevMonthInt = await 12;
  year1 = await year1 -1;
}

// Convert the result back to a two-digit string
let prevMonth = await prevMonthInt.toString().padStart(2, '0');
const lastday = await new Date(year1, prevMonth , 0).getDate();

// console.log('Previous month:', prevMonth); // Output: "02"
const searchData1 = await {
  employeeId: employeeId || '',
  month: prevMonth || '',
  timerecordId: year1 || ''
};
const response1 = await axios.post(sURL + '/timerecord/searchemp', searchData1 );
// console.log(JSON.stringify( response.data, null,2) );
const data1 = await response1.data;
// console.log(JSON.stringify( data.recordworkplace) );

await console.log('*x ' + JSON.stringify(data1.recordworkplace , null ,2) );
if(data1.recordworkplace.length !== 0){
//get workplaceId in first employee_workplaceRecord
let wpId1 = await data1.recordworkplace[0].employee_workplaceRecord[0].workplaceId;

const wpDataCalculator1 = await {
month: prevMonth || '',
year: year1 || '',
workplaceId: wpId1
};

//get workplace data for calculator
const wpResponse1 = await axios.post(sURL + '/workplace/caldata', wpDataCalculator1 );
console.log(JSON.stringify( wpResponse1.data, null,2) );
const dayOff1 = await wpResponse1.data.workplaceDayOffList;
const specialDayOff1 = await wpResponse1.data.specialDaylist;
const dayOffCheck1 = [];

await dayOff1.forEach(item => {
let dateoffParts = item.split('-');
let   str2 = parseInt(dateoffParts[2], 10);
// console.log(str2 );
dayOffCheck1.push(str2 );
});

data1.recordworkplace[0].employee_workplaceRecord.forEach(element => {
// console.log(element.workplaceId);
const tmp = {};

let dateParts = element.date.split('/');
let   str1 = parseInt(dateParts[0], 10);
console.log(str1 );

//start 20 and end is last day of month
console.log('lastday ' + lastday );
if(str1 > 20  && str1 <= lastday ) {

tmp.day =str1 +'/' + prevMonth + '/' + year1;
tmp.workplaceId = element.workplaceId || '';
let parts = element.allTime.split('.');

// Extract hours and minutes
let hours = parseInt(parts[0], 10) || 0;
let minutes = parts.length > 1 ? parseInt(parts[1], 10) : 0;

// Scale the minutes
let scaledMinutes = (minutes * 100) / 60;
let allTime = `${hours}.${scaledMinutes}` || '0';
tmp.allTimes = `${hours}.${scaledMinutes}` || '0';

let parts1 = element.otTime.split('.');

// Extract hours and minutes
let hours1 = parseInt(parts1[0], 10) || 0;
let minutes1 = parts1.length > 1 ? parseInt(parts1[1], 10) : 0;

// Scale the minutes
let scaledMinutes1 = (minutes1 * 100) / 60;
let otTime = `${hours1}.${scaledMinutes1}` || '0';

tmp.otTimes = otTime || '0';


//check special day off 
if(specialDayOff1.includes(Number(str1) ) ) {
//calculator special day off
let workRate = ((wpResponse1.data.holiday * (wpResponse1.data.workRate / 8) ) * Number(allTime));
tmp.workRate = workRate  || '';
tmp.workRateMultiply = wpResponse1.data.holiday || '';

let workRateOT = ((wpResponse1.data.holidayOT * (wpResponse1.data.workRate / 8 ) ) * Number(otTime ));
tmp.workRateOT = workRateOT  || '';
tmp.workRateOTMultiply = wpResponse1.data.holidayOT || '0';

} else 
if(dayOffCheck1.includes(str1 )  ){
//calculator day off
let workRate = ((wpResponse1.data.dayoffRateHour * (wpResponse1.data.workRate /8 ) ) * Number(allTime));
tmp.workRate = workRate || '';
tmp.workRateMultiply = wpResponse1.data.dayoffRateHour || '';

let workRateOT = ((wpResponse1.data.dayoffRateOT * (wpResponse1.data.workRate /8) ) * Number(otTime ));
tmp.workRateOT = workRateOT || '';
tmp.workRateOTMultiply = wpResponse1.data.dayoffRateOT || '';

} else {
//calculator 
let workRate = ((wpResponse1.data.workRate / 8) * Number(allTime)).toFixed(2);
tmp.workRate = workRate  || '';
tmp.workRateMultiply = '1';

let workRateOT = (((wpResponse1.data.workRate /8 ) * wpResponse1.data.workRateOT )* Number(otTime )).toFixed(2);
tmp.workRateOT = workRateOT  || '0';
tmp.workRateOTMultiply = wpResponse1.data.workRateOT || '0';

}


tmp.addSalaryDay = '';

concludeRecord.push(tmp);
} //end if
});
}

//check day is null and place data 
for(let i = 21; i <= lastday ; i++){
// tmp.day =str1 +'/' + month + '/' + year;
let d = await i +'/' + prevMonth + '/' + year1;
let x = await concludeRecord.some(record => record.day === d);

if(x) {
// console.log('i ' + d);
} else {
  await concludeRecord.push({'day': d});
}
}

// Sort the array by date directly in the main code
await concludeRecord.sort((a, b) => {
const dateA = new Date(a.day.split('/').reverse().join('/'));
const dateB = new Date(b.day.split('/').reverse().join('/'));
return dateA - dateB;
});

await console.log('Sorted concludeRecord:', concludeRecord);


// console.log('Sorted concludeRecord:', concludeRecord);
// dataConclude.concludeRecord = concludeRecord || [];

//=========
  const searchData = {
    employeeId: employeeId || '',
    month: month || '',
    timerecordId: year || ''
  };
  const response = await axios.post(sURL + '/timerecord/searchemp', searchData );
  // console.log(JSON.stringify( response.data, null,2) );
  const data = await response .data;
  // console.log(JSON.stringify( data.recordworkplace) );

  if(data.recordworkplace.length !== 0) {
//get workplaceId in first employee_workplaceRecord
let wpId = data.recordworkplace[0].employee_workplaceRecord[0].workplaceId;

const wpDataCalculator = {
  month: month || '',
  year: year || '',
  workplaceId: wpId
};

//get workplace data for calculator
const wpResponse = await axios.post(sURL + '/workplace/caldata', wpDataCalculator );
  console.log(JSON.stringify( wpResponse.data, null,2) );
const dayOff = wpResponse.data.workplaceDayOffList;
const specialDayOff = wpResponse.data.specialDaylist;
const dayOffCheck = [];

dayOff.forEach(item => {
  let dateoffParts = item.split('-');
let   str2 = parseInt(dateoffParts[2], 10);
  // console.log(str2 );
  dayOffCheck.push(str2 );
});

data.recordworkplace[0].employee_workplaceRecord.forEach(element => {
  // console.log(element.workplaceId);
  const tmp = {};

  let dateParts = element.date.split('/');
let   str1 = parseInt(dateParts[0], 10);
  console.log(str1 );


  tmp.day =str1 +'/' + month + '/' + year;
  tmp.workplaceId = element.workplaceId || '';
  let parts = element.allTime.split('.');

  // Extract hours and minutes
  let hours = parseInt(parts[0], 10) || 0;
  let minutes = parts.length > 1 ? parseInt(parts[1], 10) : 0;

  // Scale the minutes
  let scaledMinutes = (minutes * 100) / 60;
let allTime = `${hours}.${scaledMinutes}` || '0';
  tmp.allTimes = `${hours}.${scaledMinutes}` || '0';

  let parts1 = element.otTime.split('.');

  // Extract hours and minutes
  let hours1 = parseInt(parts1[0], 10) || 0;
  let minutes1 = parts1.length > 1 ? parseInt(parts1[1], 10) : 0;

  // Scale the minutes
  let scaledMinutes1 = (minutes1 * 100) / 60;
let otTime = `${hours1}.${scaledMinutes1}` || '0';

  tmp.otTimes = otTime || '0';


  //check special day off 
if(specialDayOff.includes(Number(str1) ) ) {
//calculator special day off
let workRate = ((wpResponse.data.holiday * (wpResponse.data.workRate / 8) ) * Number(allTime));
tmp.workRate = workRate  || '';
tmp.workRateMultiply = wpResponse.data.holiday || '';

let workRateOT = ((wpResponse.data.holidayOT * (wpResponse.data.workRate / 8) ) * Number(otTime ));
tmp.workRateOT = workRateOT  || '';
tmp.workRateOTMultiply = wpResponse.data.holidayOT || '0';

} else 
if(dayOffCheck.includes(str1 )  ){
//calculator day off
let workRate = ((wpResponse.data.dayoffRateHour * (wpResponse.data.workRate /8 ) ) * Number(allTime));
tmp.workRate = workRate || '';
tmp.workRateMultiply = wpResponse.data.dayoffRateHour || '';

let workRateOT = ((wpResponse.data.dayoffRateOT * (wpResponse.data.workRate / 8) ) * Number(otTime ));
tmp.workRateOT = workRateOT || '';
tmp.workRateOTMultiply = wpResponse.data.dayoffRateOT || '';

} else {
  //calculator 
  let workRate = ((wpResponse.data.workRate / 8) * Number(allTime)).toFixed(2);
  tmp.workRate = workRate  || '';
  tmp.workRateMultiply = '1';

  let workRateOT = (((wpResponse.data.workRate /8 ) * wpResponse.data.workRateOT )* Number(otTime )).toFixed(2);
  tmp.workRateOT = workRateOT  || '0';
  tmp.workRateOTMultiply = wpResponse.data.workRateOT || '0';

}


  tmp.addSalaryDay = '';
  
  concludeRecord.push(tmp);

});
  } //end if

//check day is null and place data 
for(let i = 1; i <= 20; i++){
  // tmp.day =str1 +'/' + month + '/' + year;
  let d = i +'/' + month + '/' + year;
  let x = concludeRecord.some(record => record.day === d);

if(x) {
// console.log('i ' + d);
} else {
  concludeRecord.push({'day': d});
}
}

// Sort the array by date directly in the main code
concludeRecord.sort((a, b) => {
  const dateA = new Date(a.day.split('/').reverse().join('/'));
  const dateB = new Date(b.day.split('/').reverse().join('/'));
  return dateA - dateB;
});

console.log('Sorted concludeRecord:', concludeRecord);


// console.log('Sorted concludeRecord:', concludeRecord);
dataConclude.concludeRecord = concludeRecord || [];

for(let c =0; c < concludeRecord .length; c++){
await addSalaryList.push(addSalaryDaily);
}
dataConclude.addSalary = addSalaryList;

try {
  // Find the existing document by year, month, and employeeId
  const existingRecord = await conclude.findOne({
    year: dataConclude.year,
    month: dataConclude.month,
    employeeId: dataConclude.employeeId
  });

  // If an existing record is found, delete it
  if (existingRecord) {
    await conclude.deleteOne({
      _id: existingRecord._id
    });
    console.log('Existing record deleted');
  }

  if(concludeRecord .length !== 0){
  // Create a new Conclude document
  const newConclude = new conclude(dataConclude);

  // Save the new document to the database
  const savedConclude = await newConclude.save();
  console.log('New record saved successfully:', savedConclude);
  
    res.json(dataConclude);
  }
  res.json(dataConclude);

} catch (error) {
  console.error('Error processing record:', error);
}

  // res.json(dataConclude);

  // await   console.log('Employee Time Record:', data[0].month);
} catch (e) {
  console.log(e);
}

  const concludeData = await conclude.find();
  // res.json(concludeData );
});


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
    concludeRecord,
    addSalary } = req.body;


  try {
      //create conclude record
      const recordConclude = new conclude({
        year,
        month,
        concludeDate,
        employeeId,
        concludeRecord,
        addSalary,
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




module.exports = router;
