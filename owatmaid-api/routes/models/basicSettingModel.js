const mongoose = require('mongoose');

// Define Welfare schema for Basic setting
const basicSettingSchema = new mongoose.Schema({
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
  
  
});

// Create the conclude record time model based on the schema
const BasicSetting= mongoose.model('basicSetting', basicSettingSchema);

module.exports = BasicSetting;