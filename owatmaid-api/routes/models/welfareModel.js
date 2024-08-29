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

  id: String,
  name: String,
  amountDay: String,
  countDay: String,
      startDay: String,
endDay: String,
  comment: String,

  
    addSalary: [{
      id: String,
      name: String,
      SpSalary: String,
      roundOfSalary: String,
      StaffType: String,
      nameType: String,
      message: String,
    }]
  
});

// Create the conclude record time model based on the schema
const Welfare= mongoose.model('welfare', welfareSchema );

module.exports = Welfare;