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
const { el } = require('date-fns/locale');


//Connect mongodb
mongoose.connect(connectionString, {
  useNewUrlParser: true, useUnifiedTopology:
    true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Define time record schema for workplace
const accountingSchema = new mongoose.Schema({
  year: String,
  month: String,
 createDate: String,
  employeeId: String,
  workplace: String,
accountingRecord: [{ 
  countDay: String, 
 amountDay: String, 
 amountOt: String, 
 amountSpecial: String,
 amountPosition: String,
 amountHardWorking: String,
amountHoliday: String,
addAmountBeforeTax:String,
deductBeforeTax: String,
tax: String,
socialSecurity: String,
addAmountAfterTax:String,
advancePayment: String, 
deductAfterTax: String,
bank: String,
total: String
}],
createBy: String,
addSalary: [{
  id: String,
  name: String,
  SpSalary: String,
  roundOfSalary: String,
  StaffType: String,
  nameType: String,
  message: String,
}],
deductSalary: [{
  id: String,
  name: String,
  amount: String,
  payType: String,
  installment: String,
  nameType: String,
  message: String,
}],
status: String
});

// Create the conclude record time model based on the schema
const accounting= mongoose.model('accounting', accountingSchema );


// Get list of accounting
router.get('/list', async (req, res) => {
// try{
//   const response = await axios.get('http://localhost:3000/employee/list/');
// // await console.log(response.data[0] );
// const emp = await response.data[0];
// const employees = await Object.values(emp);
// if (!Array.isArray(employees )) {
//   console.error('Employees data is not an array');
//   // Handle the error appropriately, or return from the function
// }

// // Grouping employees by workplace
// const groupedEmployees = await employees.reduce((acc, employee) => {
//   const { workplace } = employee;
//   if (!acc[workplace]) {
//     acc[workplace] = [];
//   }
//   acc[workplace].push(employee);
//   return acc;
// }, {});

// // await console.log(groupedEmployees );

// } catch (e) {
// console.log(e);
// }

  const accountingData = await accounting.find();
  res.json(accountingData );
});


// Get  accounting record by accounting Id
router.get('/:employeeId', async (req, res) => {
try {
  const dataTest = await {
    year: "2024", 
        month: "03",
        // employeeId : "1001"
      };
      const x = await axios.post(sURL + '/accounting/calsalarylist', dataTest);
res.json(x.data);
  
  
} catch (e) {

}

});



//get accounting by id
router.post('/calsalaryemp', async (req, res) => {
  try {
    const { year, month , employeeId} = req.body;

    const dataSearch = {
      year: year, 
      month: month,
      concludeDate: "",
      employeeId: employeeId
    };

    const responseConclude = await axios.post(sURL + '/conclude/search', dataSearch);

    const dataList = [];

    if (responseConclude.data.recordConclude.length > 0) {
      for (let c = 0; c < responseConclude.data.recordConclude.length; c++) {
        const data = {}; // Initialize data object inside the loop


        data.year = responseConclude.data.recordConclude[c].year;
        data.month = responseConclude.data.recordConclude[c].month;
        data.createDate = new Date().toLocaleDateString('en-GB');
        data.employeeId = responseConclude.data.recordConclude[c].employeeId;
        data.accountingRecord = {};

        let countDay = 0;
        let countHour = 0;
        let countOtHour = 0;
        let amountDay = 0;
        let amountOt = 0;
        let amountSpecial = 0;
        let sumSocial = 0;
let sumCalTax = 0;
let sumCalTaxNonSalary = 0;
let sumNonTaxNonSalary = 0;
let sumDeductWithTax = 0;
let sumDeductUncalculateTax = 0;
let tax = 0;
let total = 0;

        for (let i = 0; i < responseConclude.data.recordConclude[c].concludeRecord.length; i++) {
          amountDay += parseFloat(responseConclude.data.recordConclude[c].concludeRecord[i].workRate || 0);
          amountOt += parseFloat(responseConclude.data.recordConclude[c].concludeRecord[i].workRateOT || 0);
          amountSpecial += parseFloat(responseConclude.data.recordConclude[c].concludeRecord[i].addSalaryDay || 0);
          countHour += parseFloat(responseConclude.data.recordConclude[c].concludeRecord[i].allTimes || 0);
          countOtHour += parseFloat(responseConclude.data.recordConclude[c].concludeRecord[i].otTimes || 0);

          if (responseConclude.data.recordConclude[c].concludeRecord[i].workRate !== undefined) {
            countDay++;
          }
        }

        data.accountingRecord.countDay = countDay;
        data.accountingRecord.countHour = countHour;
        data.accountingRecord.countOtHour = countOtHour;

        data.accountingRecord.amountDay = amountDay;
        data.accountingRecord.amountOt = amountOt;

      sumSocial = await sumSocial + amountDay;
      sumCalTax = await sumCalTax + amountDay;
      sumCalTax = await sumCalTax + amountOt;

// await console.log(sumSocial );

// Get employee data by employeeId
const response = await axios.get(sURL + '/employee/' + responseConclude.data.recordConclude[c].employeeId);
if (response) {
    data.workplace = await response.data.workplace;
    data.accountingRecord.tax = await response.data.tax ||0;
tax = await response.data.tax ||0; 


    // data.employeeId = responseConclude.data.recordConclude[c].employeeId;
    data.name = await response.data.name;
    data.lastName = await response.data.lastName;

    let position1230 = '1230';
    const addSalary = response.data.addSalary.find(salary => salary.id === position1230);

    if (addSalary) {
        data.accountingRecord.amountPosition = addSalary.SpSalary;
    } else {
        data.accountingRecord.amountPosition = 0;
    }
    
    let amountHardWorking1410 = '1410';
    const addSalary1 = response.data.addSalary.find(salary => salary.id === amountHardWorking1410 );

    if (addSalary1) {
        data.accountingRecord.amountHardWorking = addSalary1.SpSalary;
    } else {
      data.accountingRecord.amountHardWorking = 0;
    }

    let amountSpecial1560 = '1560';
    const addSalary2 = response.data.addSalary.find(salary => salary.id === amountSpecial1560 );

    if (addSalary2) {
        data.accountingRecord.amountSpecial = addSalary2.SpSalary;
    } else {
      data.accountingRecord.amountSpecial = 0;
    }

//check deduct 
let advancePayment2330 = '2330';
const deductSalary = response.data.deductSalary.find(salary => salary.id === advancePayment2330 );

if (deductSalary ) {
  data.accountingRecord.advancePayment = deductSalary.amount;
} else {
  data.accountingRecord.advancePayment = 0;
}


    //check cal social 
    let promises = [];
    let promises1 = [];
    let promisesDeduct = [];
let addSalaryList = [];
let deductSalaryList = [];

    for (let k = 0; k < response.data.addSalary.length; k++) {
        const promise = await checkCalSocial(response.data.addSalary[k].id || '0');
        const promise1 = await checkCalTax(response.data.addSalary[k].id || '0');

        await promises.push(promise);
        await promises1.push(promise1);

        //push addSalary to account
        if(response.data.addSalary[k].roundOfSalary == "daily") {
          let dailyTmp = await response.data.addSalary[k];
          dailyTmp.message = await countDay;
          await addSalaryList.push(dailyTmp);
        } else {
          await addSalaryList.push(response.data.addSalary[k]);
        }
// console.log(response.data.addSalary[k].roundOfSalary );
    }

    for (let l = 0; l < response.data.deductSalary.length; l++) {
      const promisesDeduct1 = await checkCalTax(response.data.deductSalary[l].id || '0');

      await promisesDeduct.push(promisesDeduct1 );
await deductSalaryList.push(response.data.deductSalary[l] );
      
  }

    await Promise.all(promises)
        .then(results => {
            // let sumSocial = 0;
            results.forEach((result, k) => {
                if (result === true) {
                    sumSocial += parseFloat(response.data.addSalary[k].SpSalary || 0);
                    // console.log(`Promise ${k} is resolved`);
                    // console.log(response.data.addSalary[k].SpSalary);
                }
            });
            // console.log(sumSocial);
        })
        .catch(error => {
            // console.error('Error occurred while processing promises:', error);
        });
    
//check cal tax
await Promise.all(promises1)
.then(results => {
    // let sumSocial = 0;
    results.forEach((result, k) => {
        if (result === true) {
          if(response.data.addSalary[k].roundOfSalary === "daily") {
            sumCalTax+= parseFloat(response.data.addSalary[k].SpSalary || 0) * countDay;
            sumCalTaxNonSalary += parseFloat(response.data.addSalary[k].SpSalary || 0) *countDay;

          } else {
            sumCalTax+= parseFloat(response.data.addSalary[k].SpSalary || 0);
            sumCalTaxNonSalary += parseFloat(response.data.addSalary[k].SpSalary || 0);

          }

            // console.log(`Promise ${k} is resolved`);
            // console.log(response.data.addSalary[k].SpSalary);
        }  else {
          if(response.data.addSalary[k].roundOfSalary === "daily") {
            sumNonTaxNonSalary+= parseFloat(response.data.addSalary[k].SpSalary || 0) * countDay;
          } else {
            sumNonTaxNonSalary+= parseFloat(response.data.addSalary[k].SpSalary || 0);
          }

        }
    });
    // console.log(sumCalTax);
})
.catch(error => {
    console.error('Error occurred while processing promises:', error);
});

//check deduct calculate tax
await Promise.all(promisesDeduct)
.then(results => {
    // let sumSocial = 0;
    results.forEach((result, k) => {
        if (result === true) {
            sumDeductWithTax += parseFloat(response.data.deductSalary[k].amount || 0);

        }  else {
          // sumNonTaxNonSalary+= parseFloat(response.data.addSalary[k].SpSalary || 0);
          sumDeductUncalculateTax += parseFloat(response.data.deductSalary[k].amount || 0);

        }
    });
    // console.log(sumCalTax);
})
.catch(error => {
    console.error('Error occurred while processing promises:', error);
});

// await console.log(
//   "amount day" +amountDay +   
//   "amount Ot" +amountOt + 
// "sum calculate tax" +    sumCalTaxNonSalary + 
// "sum deduct with tax" +     sumDeductWithTax 
//   +"tax " + tax
//   +" social" + sumSocial * 0.05
//   +"sum non tax" + sumNonTaxNonSalary 
//   + "deduct un tax" +  sumDeductUncalculateTax );
  
  
//total
total = await amountDay + amountOt + sumCalTaxNonSalary - sumDeductWithTax 
- tax
- ((sumSocial * 0.05) || 0)
+ (sumNonTaxNonSalary || 0)
- (sumDeductUncalculateTax || 0);

    // Other properties
    data.accountingRecord.amountHoliday = 0;
    data.accountingRecord.addAmountBeforeTax = sumCalTaxNonSalary || 0;
    data.accountingRecord.deductBeforeTax = sumDeductWithTax || 0;
    // data.accountingRecord.tax = sumCalTax || 0;
    // Assuming sumSocial is defined somewhere before this code
// Check if sumSocial is greater than 15000
if (sumSocial > 15000) {
  sumSocial = await 15000; // Set sumSocial to 15000
}

// Calculate socialSecurity based on sumSocial
data.accountingRecord.socialSecurity = (sumSocial * 0.05) || 0;

    // data.accountingRecord.socialSecurity = (sumSocial * 0.05) || 0;
    data.accountingRecord.addAmountAfterTax = sumNonTaxNonSalary || 0;
    // data.accountingRecord.advancePayment = 0;
    data.accountingRecord.deductAfterTax = sumDeductUncalculateTax || 0;
    data.accountingRecord.bank = 0;
    data.accountingRecord.total = total || 0;
    data.accountingRecord.sumSalaryForTax = sumCalTax || 0;
    data.addSalary = addSalaryList || [];
data.deductSalary = deductSalaryList || [];

}

        dataList.push(data);
      }
    } else {
      console.log('no data conclude');
    }

    // console.log(JSON.stringify(dataList, null, 2));

    if (dataList.length > 0) {
      res.json(dataList);
    } else {
      res.status(404).json({ error: 'accounting not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//get all accounting
router.post('/calsalarylist', async (req, res) => {
  try {
    const { year, month } = req.body;
    const workplaceList = await axios.get(sURL + '/workplace/list');

    const dataSearch = {
      year: year, 
      month: month,
      concludeDate: "",
      employeeId: ''
    };

    const responseConclude = await axios.post(sURL + '/conclude/search', dataSearch);

    const dataList = [];

    if (responseConclude.data.recordConclude.length > 0) {
      for (let c = 0; c < responseConclude.data.recordConclude.length; c++) {
        const data = {}; // Initialize data object inside the loop


        data.year = responseConclude.data.recordConclude[c].year;
        data.month = responseConclude.data.recordConclude[c].month;
        data.createDate = new Date().toLocaleDateString('en-GB');
        data.employeeId = responseConclude.data.recordConclude[c].employeeId;
        data.accountingRecord = {};

        let countDay = 0;
        let countHour = 0;
        let countOtHour = 0;
        let amountDay = 0;
        let amountOt = 0;
        let amountSpecial = 0;
        let sumSocial = 0;
let sumCalTax = 0;
let sumCalTaxNonSalary = 0;
let sumNonTaxNonSalary = 0;
let sumDeductWithTax = 0;
let sumDeductUncalculateTax = 0;
let tax = 0;
let total = 0;

let holidayRate = 0;
let workDaylist = [];

let specialDaylist = [];
let countSpecialDay = 0;
let amountSpecialDay = 0;


// Get employee data by employeeId
const response = await axios.get(sURL + '/employee/' + responseConclude.data.recordConclude[c].employeeId);
if (response) {
    data.workplace = await response.data.workplace;
    data.accountingRecord.tax = await response.data.tax ||0;
tax = await response.data.tax ||0; 

// await console.log(response.data);

//ss
// console.log(response.data.workplace );
    // Find the workplace with the matching ID
    const foundWorkplace = await workplaceList.data.find(workplace => workplace.workplaceId === response.data.workplace );

    if (foundWorkplace) {
      amountSpecial = await foundWorkplace.holiday || 0;

      // Found the workplace
      // await console.log('Found workplace:', foundWorkplace);
      // console.log(foundWorkplace.daysOff);
      await foundWorkplace.daysOff.map(async item => {
        const originalDateString = await item;
        const originalDate = await new Date(originalDateString);
        const month1 = await (originalDate.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed, so 
        const year1 = await originalDate.getFullYear();
        const day1 = await originalDate.getDate() +1; // Increment by 1 to get the next day

        const tmpDate = await new Date(year1, month1, 0); // month is 0-indexed, so month + 1        
if(tmpDate.getDate() < day1 ) {
  day1  = await day1  - tmpDate.getDate();
}
        // const day1 = await originalDate.getDate() +1; // Increment by 1 to get the next day
// const day1 = (originalDate.getDate() +1 ).toString().padStart(2, '0'); // Ensure day is represented by 


if(month >= 1 ){
  
if(month -1 == month1 && year == year1 && day1 >= 21) {
  await specialDaylist.push(day1);
  holidayRate = await response.data.salary || foundWorkplace.workRate;
          }
        if(month == month1 && year == year1 && day1 <= 20) {
await specialDaylist.push(day1);
holidayRate = await response.data.salary || foundWorkplace.workRate;
        }

       } else {

        if(month == month1 && year == year1 && day1 <= 20) {
          await specialDaylist.push(day1);
          holidayRate = await response.data.salary || foundWorkplace.workRate;
                  }
       }


// console.log(year + ' ' + year1 + ' ' + month + ' ' + month1);
      })

// Format the components as desired
// const formattedDate = `${year}/${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}`;

    } else {
      // Workplace with the given ID not found
      // await console.log('Workplace not found');
    }

    // data.employeeId = responseConclude.data.recordConclude[c].employeeId;
    data.name = await response.data.name;
    data.lastName = await response.data.lastName;

    let position1230 = '1230';
    const addSalary = response.data.addSalary.find(salary => salary.id === position1230);

    if (addSalary) {
        data.accountingRecord.amountPosition = addSalary.SpSalary;
    } else {
        data.accountingRecord.amountPosition = 0;
    }
    
    let amountHardWorking1410 = '1410';
    const addSalary1 = response.data.addSalary.find(salary => salary.id === amountHardWorking1410 );

    if (addSalary1) {
        data.accountingRecord.amountHardWorking = addSalary1.SpSalary;
    } else {
      data.accountingRecord.amountHardWorking = 0;
    }

    let amountSpecial1560 = '1560';
    const addSalary2 = response.data.addSalary.find(salary => salary.id === amountSpecial1560 );

    if (addSalary2) {
        data.accountingRecord.amountSpecial = addSalary2.SpSalary;
    } else {
      data.accountingRecord.amountSpecial = 0;
    }

//check deduct 
let advancePayment2330 = '2330';
const deductSalary = response.data.deductSalary.find(salary => salary.id === advancePayment2330 );

if (deductSalary ) {
  data.accountingRecord.advancePayment = deductSalary.amount;
} else {
  data.accountingRecord.advancePayment = 0;
}


    //check cal social 
    let promises = [];
    let promises1 = [];
    let promisesDeduct = [];
let addSalaryList = [];
let deductSalaryList = [];

    for (let k = 0; k < response.data.addSalary.length; k++) {
        const promise = await checkCalSocial(response.data.addSalary[k].id || '0');
        const promise1 = await checkCalTax(response.data.addSalary[k].id || '0');

        await promises.push(promise);
        await promises1.push(promise1);

        //push addSalary to account
        if(response.data.addSalary[k].roundOfSalary == "daily") {
          let dailyTmp = await response.data.addSalary[k];
          dailyTmp.message = await countDay;
          await addSalaryList.push(dailyTmp);
        } else {
          await addSalaryList.push(response.data.addSalary[k]);
        }
// console.log(response.data.addSalary[k].roundOfSalary );
    }

    for (let l = 0; l < response.data.deductSalary.length; l++) {
      const promisesDeduct1 = await checkCalTax(response.data.deductSalary[l].id || '0');

      await promisesDeduct.push(promisesDeduct1 );
await deductSalaryList.push(response.data.deductSalary[l] );
      
  }

    await Promise.all(promises)
        .then(results => {
            // let sumSocial = 0;
            results.forEach((result, k) => {
                if (result === true) {
                    sumSocial += parseFloat(response.data.addSalary[k].SpSalary || 0);
                    // console.log(`Promise ${k} is resolved`);
                    // console.log(response.data.addSalary[k].SpSalary);
                }
            });
            // console.log(sumSocial);
        })
        .catch(error => {
            console.error('Error occurred while processing promises:', error);
        });
    
//check cal tax
await Promise.all(promises1)
.then(results => {
    // let sumSocial = 0;
    results.forEach((result, k) => {
        if (result === true) {
          if(response.data.addSalary[k].roundOfSalary === "daily") {
            sumCalTax+= parseFloat(response.data.addSalary[k].SpSalary || 0) * countDay;
            sumCalTaxNonSalary += parseFloat(response.data.addSalary[k].SpSalary || 0) *countDay;

          } else {
            sumCalTax+= parseFloat(response.data.addSalary[k].SpSalary || 0);
            sumCalTaxNonSalary += parseFloat(response.data.addSalary[k].SpSalary || 0);

          }

            // console.log(`Promise ${k} is resolved`);
            // console.log(response.data.addSalary[k].SpSalary);
        }  else {
          if(response.data.addSalary[k].roundOfSalary === "daily") {
            sumNonTaxNonSalary+= parseFloat(response.data.addSalary[k].SpSalary || 0) * countDay;
          } else {
            sumNonTaxNonSalary+= parseFloat(response.data.addSalary[k].SpSalary || 0);
          }

        }
    });
    // console.log(sumCalTax);
})
.catch(error => {
    console.error('Error occurred while processing promises:', error);
});

//check deduct calculate tax
await Promise.all(promisesDeduct)
.then(results => {
    // let sumSocial = 0;
    results.forEach((result, k) => {
        if (result === true) {
            sumDeductWithTax += parseFloat(response.data.deductSalary[k].amount || 0);

        }  else {
          // sumNonTaxNonSalary+= parseFloat(response.data.addSalary[k].SpSalary || 0);
          sumDeductUncalculateTax += parseFloat(response.data.deductSalary[k].amount || 0);

        }
    });
    // console.log(sumCalTax);
})
.catch(error => {
    console.error('Error occurred while processing promises:', error);
});

// await console.log(
//   "amount day" +amountDay +   
//   "amount Ot" +amountOt + 
// "sum calculate tax" +    sumCalTaxNonSalary + 
// "sum deduct with tax" +     sumDeductWithTax 
//   +"tax " + tax
//   +" social" + sumSocial * 0.05
//   +"sum non tax" + sumNonTaxNonSalary 
//   + "deduct un tax" +  sumDeductUncalculateTax );

// console.log("test" + (specialDaylist.length * holidayRate ) + '*' + amountSpecial);
//ss1
for (let i = 0; i < responseConclude.data.recordConclude[c].concludeRecord.length; i++) {
  amountDay += parseFloat(responseConclude.data.recordConclude[c].concludeRecord[i].workRate || 0);
  amountOt += parseFloat(responseConclude.data.recordConclude[c].concludeRecord[i].workRateOT || 0);
  amountSpecial += parseFloat(responseConclude.data.recordConclude[c].concludeRecord[i].addSalaryDay || 0);
  countHour += parseFloat(responseConclude.data.recordConclude[c].concludeRecord[i].allTimes || 0);
  countOtHour += parseFloat(responseConclude.data.recordConclude[c].concludeRecord[i].otTimes || 0);

  if (responseConclude.data.recordConclude[c].concludeRecord[i].workRate !== undefined) {
    countDay++;
    workDaylist.push(responseConclude.data.recordConclude[c].concludeRecord[i].day.split("/")[0] );

  }

}

data.accountingRecord.countDay = countDay;
data.accountingRecord.countHour = countHour;
data.accountingRecord.countOtHour = countOtHour;

data.accountingRecord.amountDay = amountDay;
data.accountingRecord.amountOt = amountOt;

sumSocial = await sumSocial + amountDay;
sumCalTax = await sumCalTax + amountDay;
sumCalTax = await sumCalTax + amountOt;

// await console.log(sumSocial );


const intersection = await workDaylist.filter(day => specialDaylist.includes(parseInt(day)));

await console.log(data.employeeId + ' ' + month);
await console.log('workDaylist' + JSON.stringify(workDaylist,null,2))
await console.log('specialDaylist' + JSON.stringify(specialDaylist,null,2));

await console.log(intersection); // Output: ['2', '3', '4']
//total
total = await amountDay + amountOt + sumCalTaxNonSalary - sumDeductWithTax 
- tax
- ((sumSocial * 0.05) || 0)
+ (sumNonTaxNonSalary || 0)
- (sumDeductUncalculateTax || 0);

    // Other properties
    data.accountingRecord.amountHoliday = 0;
    data.accountingRecord.addAmountBeforeTax = sumCalTaxNonSalary || 0;
    data.accountingRecord.deductBeforeTax = sumDeductWithTax || 0;
    // data.accountingRecord.tax = sumCalTax || 0;
    // Assuming sumSocial is defined somewhere before this code
// Check if sumSocial is greater than 15000
if (sumSocial > 15000) {
  sumSocial = await 15000; // Set sumSocial to 15000
}

// Calculate socialSecurity based on sumSocial
data.accountingRecord.socialSecurity = Math.ceil((sumSocial * 0.05)) || 0;

    // data.accountingRecord.socialSecurity = (sumSocial * 0.05) || 0;
    data.accountingRecord.addAmountAfterTax = sumNonTaxNonSalary || 0;
    // data.accountingRecord.advancePayment = 0;
    data.accountingRecord.deductAfterTax = sumDeductUncalculateTax || 0;
    data.accountingRecord.bank = 0;
    data.accountingRecord.total = total || 0;
    data.accountingRecord.sumSalaryForTax = sumCalTax || 0;
    data.addSalary = addSalaryList || [];
data.deductSalary = deductSalaryList || [];

data.specialDayRate = await holidayRate || 0;
data.countSpecialDay = await specialDaylist.length || 0;
data.specialDayListWork = await intersection || [];
//end point


}

        dataList.push(data);
      }
    } else {
      console.log('no data conclude');
    }

    // console.log(JSON.stringify(dataList, null, 2));

    if (dataList.length > 0) {
      res.json(dataList);
    } else {
      res.status(404).json({ error: 'accounting not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

  router.post('/calsalary', async (req, res) => {
    // router.get('/:employeeId', async (req, res) => {

const data = await {};

  try {
    const {
      year, 
      month,
      employeeId 
    } = await req.body;

    const dataSearch = await {
      year: year, 
      month: month,
      concludeDate: "",
      employeeId : employeeId 
      // req.params.employeeId
    };
await console.log(dataSearch);

//get data from conclude record
    const responseConclude = await axios.post(sURL + '/conclude/search', dataSearch);
    await console.log(responseConclude.data.recordConclude.length );
    if(responseConclude.data.recordConclude.length > 0 ) {
      // console.log(responseConclude.data.recordConclude.length );
// await console.log(JSON.stringify(responseConclude.data,null,2) );

data.year = await responseConclude.data.recordConclude[0].year; 
data.month = await responseConclude.data.recordConclude[0].month;
data.createDate = await new Date().toLocaleDateString('en-GB');
data.employeeId = await responseConclude.data.recordConclude[0].employeeId;
data.accountingRecord  = await {};

// data.accountingRecord.countDay = await responseConclude.data.recordConclude[0].concludeRecord.length;

let countDay  = await 0;
let amountDay = await 0;
let amountOt = await 0;
let amountSpecial  = await 0;
//loop count data
// await console.log(responseConclude.data.recordConclude[0].concludeRecord);
for(let i =0; i < responseConclude.data.recordConclude[0].concludeRecord.length; i++) {
  amountDay  = await amountDay + parseFloat(responseConclude.data.recordConclude[0].concludeRecord[i].workRate || 0 );
  amountOt = await amountOt + parseFloat(responseConclude.data.recordConclude[0].concludeRecord[i].workRateOT || 0 );
  amountSpecial = await amountSpecial + parseFloat(responseConclude.data.recordConclude[0].concludeRecord[i].addSalaryDay || 0 );

  if(responseConclude.data.recordConclude[0].concludeRecord[i].workRate !== '' ){
    countDay  = await countDay   + 1;
  }
}
// await console.log(amountSpecial );

data.accountingRecord.countDay = await countDay;
data.accountingRecord.amountDay = await amountDay  ;
data.accountingRecord.amountOt = await amountOt;
data.accountingRecord.amountSpecial = await amountSpecial;

// await console.log(responseConclude.data.recordConclude[0].concludeRecord.length);

//xxxx
    } else {
console.log('no data conclude');
    }

    //get employee data by employeeId
      const response = await axios.get(sURL + '/employee/'+ employeeId);
      if(response) {
        data.workplace = await response.data.workplace;
console.log(response.data.addSalary.length);

let position1230 = await '1230';
const addSalary = await response.data.addSalary.find(salary => salary.id === position1230 );

if (addSalary) {
  // console.log('Found addSalary:', addSalary);
  data.accountingRecord.amountPosition = await addSalary.SpSalary;
  // Handle addSalary found
} else {
  // console.log('No addSalary found with the provided ID.');
  data.accountingRecord.amountPosition = await 0;
  // Handle no addSalary found
}

let hardwork1410 = await '1410';
const addSalary1 = await response.data.addSalary.find(salary => salary.id === hardwork1410 );

if (addSalary1) {
  data.accountingRecord.amountHardWorking= await addSalary1.SpSalary;
} else {
  data.accountingRecord.amountHardWorking= await 0;
}

//xxxx
data.accountingRecord.amountHoliday = await 0;
data.accountingRecord.addAmountBeforeTax = await 0;
data.accountingRecord.tax = await 0;
data.accountingRecord.socialSecurity = await 0;
data.accountingRecord.addAmountAfterTax = await 0;
data.accountingRecord.advancePayment = await 0;
data.accountingRecord.deductAfterTax = await 0;
data.accountingRecord.deductBeforeTax = await 10;

data.accountingRecord.bank = await 0;
data.accountingRecord.total = await 0;

      }
    // await console.log(response.data.workplace );
    // console.log(data);

    // const accountingData = await accounting.findOne({ employeeId: req.params.employeeId});


    // if (accountingData ) {
      if (data) {

      res.json(data);
    } else {
      res.status(404).json({ error: 'accounting not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }

});


// Get  accounting record by accounting Id
router.post('/search', async (req, res) => {
  try {
    const { 
      year,
      month,
      createDate,
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
    if (createDate !== '') {
      query.createDate = createDate;
    }

// console.log('query.date ' + query.date);
    // console.log('Constructed Query:');
    // console.log(query);

    if (month== '' && year == '' && employeeId== '') {
      res.status(200).json({});
    }

    // Query the workplace collection for matching documents
    const recordAccounting = await accounting.find(query);

    // await console.log('Search Results:');
    // await console.log(recordworkplace  );
    let textSearch = 'accounting';
    await res.status(200).json({ recordAccounting  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Create new accounting
router.post('/create', async (req, res) => {
  const { 
    year,
    month,
    createDate,
    employeeId,
    workplace,
    createBy,
    accountingRecord } = req.body;


  try {
      //create conclude record
      const recordAccounting = new accounting({
        year,
        month,
        createDate,
        employeeId,
        workplace,
        accountingRecord,
        createBy });

    const ans = await recordAccounting.save();
    if (ans) {
      console.log('Create accounting record success');
    }

    res.json(recordAccounting);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});


// Update existing records in accounting
router.put('/update/:accountingRecordId', async (req, res) => {
  const accountingIdToUpdate = req.params.accountingRecordId;
  const updateFields = req.body;

  try {
    // Find the resource by ID and update it
    const updatedResource = await accounting.findByIdAndUpdate(
      accountingIdToUpdate,
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


async function getEmployeeData(id) {
  try {
    const response = await axios.get(sURL + '/employee/'+ id);
  // await console.log(response.data.workplace );
  return response.data;
  } catch (e) {
    console.log(e);
  }
}


async function checkCalSocial(id) {
  const idList = await ["1230","1231","1233","1241","1242","1350","1423","1428","1434","1520","1522","1524","1525","1526","1529","1531","1533","1534","1429","1427","1245","1234","2111","2116","2120","2124"];

  
  const idToCheck = await id;
  
  if (idList.includes(idToCheck)) {
      // console.log(`ID ${idToCheck} is included in the list.`);
      return await true;
  } else {
      // console.log(`ID ${idToCheck} is not included in the list.`);
      return await false;
  }
  
}

async function checkCalTax(id) {
  const idList = await ["1110","1120","1130","1140","1150","1210","1230","1231","1233","1241","1242","1251","1330","1350","1410","1422","1423","1428","1434","1440","1441","1444","1445","1446","1520","1522","1524","1525","1526","1528","1535","1540","1541","1550","1560","1447","1613","1561","1542","1536","1529","1531","1532","1533","1534","1442","1435","1429","1427","1412","1245","1234","1159","2111","2113","2116","2117","2120","2124","2160","2430","1190","1211","1212","1214","1235","1236","1243","1351","1411","1425","1426","1431","1448","1449","1527","1562","2114","2123","1543","1443","1544"];
  
  const idToCheck = await id;
  
  if (idList.includes(idToCheck)) {
      // console.log(`ID ${idToCheck} is included in the list.`);
      return await true;
  } else {
      // console.log(`ID ${idToCheck} is not included in the list.`);
      return await false;
  }
}

module.exports = router;