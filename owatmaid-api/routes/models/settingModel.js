const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  year: String,
  month: String,
 createDate: String,
createBy: String,
status: String,

social: [ {
  maxSalary   : String,
  maxSocial: String,
  socialPercent : String,
  comSocial : String,
  comSocialPercent : String,

}],
hospital : {},

salary: [{
  salaryStandard : String,
}],
leave: [{
  sickLeave: String,
  personalLeave: String,
  vacationLeave: String
}],
  
  
});

// Create the conclude record time model based on the schema
const  setting= mongoose.model('setting', settingSchema);

module.exports = setting;