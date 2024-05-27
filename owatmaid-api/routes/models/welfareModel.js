const mongoose = require('mongoose');

// Define Welfare schema for employee
const welfareSchema = new mongoose.Schema({
  year: String,
  month: String,
 createDate: String,
  employeeId: String,
  workplace: String,
createBy: String,
status: String,
welfareRecord: [{ 
  id: String,
  name: String,
  numberDays: String,
  UseDays: String,
  amountDays: String,
  comment: String,
  total: String
  }],
  welfareUseRecord: [{ 
    id: String,
    name: String,
    numberDays: String,
    StartDays: String,
    amountDays: String,
    comment: String,
    total: String
    }]
  
});

// Create the conclude record time model based on the schema
const welfare= mongoose.model('welfare', welfareSchema );

module.exports = welfare;