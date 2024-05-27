const mongoose = require('mongoose');

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

module.exports = accounting;
