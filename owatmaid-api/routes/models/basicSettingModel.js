const mongoose = require('mongoose');

// Define Welfare schema for Basic setting
const basicsettingSchema = new mongoose.Schema({
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
leave: {
  sickLeave: String,
  personalLeave: String,
  vacationLeave: String
},
  
  
});

// Create the conclude record time model based on the schema
const  basicsettingmodel = mongoose.model('basicsetting', basicsettingSchema);

module.exports = basicsettingmodel;