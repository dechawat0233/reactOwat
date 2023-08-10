    const connectionString = require('../config');

var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

//Connect mongodb
mongoose.connect(connectionString ,{ useNewUrlParser: true, useUnifiedTopology: 
true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Define time record schema
const workplaceTimerecordSchema = new mongoose.Schema({
    timerecordType: String ,
    workplaceId: String ,
    workplaceName: String ,
    date: Date,
    employeeRecord: {
        employeeId: String,
        employeeName: String,
shift: String,

    },

    workStart2: {
        type: String
    },
    workEnd2: {
        type: String
    },
    workStart3: {
        type: String
    },
    workEnd3: {
        type: String
    },
    workOfHour: {
        type: String
    },
    workOfOT: {
        type: String
    },
    workRate: {
        type: String
    },
    workRateOT: {
        type: String
    },
    workTotalPeople: {
        type: String,
    },
    holiday: {
        type: String
    },
    holidayHour: {
        type: String
    },
    salaryadd1: {
        type: String
    },
    salaryadd2: {
        type: String
    },
    salaryadd3: {
        type: String
    },
    salaryadd4: {
        type: String
    },
    salaryadd5: {
        type: String
    },
    salaryadd6: {
        type: String
    },
    personalLeave: {
        type: String
    },
    personalLeaveRate: {
        type: String
    },
    sickLeave: {
        type: String
    },
    sickLeaveRate: {
        type: String
    },
    workRateDayoff: {
        type: String
    },
    workRateDayoffRate: {
        type: String
    },
    daysOff: [{
        type: Date
    }],
    workplaceAddress: {
        type: String
    },
    reason: {
        type: String
}
});

// Create the workplace model based on the schema
const Workplace = mongoose.model('Workplace', workplaceSchema);


// Get list of workplaces
  router.get('/list',  async (req, res) => {
      const workplaces = await Workplace.find();
      res.json(workplaces);
  });

  // Get  workplace by Id
router.get('/:workplaceId',  async (req, res) => {
      try {
          const workplace = await Workplace.findOne({ workplaceId: req.params.workplaceId });
          if (workplace) {
              res.json(workplace);
        } else {
              res.status(404).json({ error: 'workplace not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    
  });


router.post('/search', async (req, res) => {
  try {
      const { searchWorkplaceId, searchWorkplaceName } = req.body;

    // Construct the search query based on the provided parameters
    const query = {};

      if (searchWorkplaceId !== '') {
          query.workplaceId = searchWorkplaceId;
    }


      if (searchWorkplaceName !== '') {
          query.workplaceName = { $regex: new RegExp(searchWorkplaceName , 'i') };
//{ $regex: name, $options: 'i' };
      }
//    query.searchWorkplaceId = '1001';
//    console.log({ employeeId, name, idCard, workPlace });

    console.log('Constructed Query:');
    console.log(query);
      if (searchWorkplaceId == '' && searchWorkplaceName == '') {
    res.status(200).json({ });
}

    // Query the workplace collection for matching documents
      const workplaces = await Workplace.find(query);

      await console.log('Search Results:');
      await console.log(workplaces );
      let textSearch = 'workplace';
      await res.status(200).json({ workplaces });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Create new workplace 
router.post('/create', async (req, res) => {
  
    const {
        workplaceId,
workplaceName,
workplaceArea,
workOfWeek,
workStart1,
workEnd1,
workStart2,
workEnd2,
workStart3,
workEnd3,
workOfHour,
workOfOT,
workRate,
workRateOT,
workTotalPeople,
holiday,
holidayHour,
salaryadd1,
salaryadd2,
salaryadd3,
salaryadd4,
salaryadd5,
salaryadd6,
personalLeave,
personalLeaveRate,
sickLeave,
sickLeaveRate,
workRateDayoff,
workRateDayoffRate,
daysOff,
        workplaceAddress,
        reason,
    } = req.body;

    
    // Create workplace
    const workplace = new Workplace({
        workplaceId,
        workplaceName,
        workplaceArea,
        workOfWeek,
        workStart1,
        workEnd1,
        workStart2,
        workEnd2,
        workStart3,
        workEnd3,
        workOfHour,
        workOfOT,
        workRate,
        workRateOT,
        workTotalPeople,
        holiday,
        holidayHour,
        salaryadd1,
        salaryadd2,
        salaryadd3,
        salaryadd4,
        salaryadd5,
        salaryadd6,
        personalLeave,
        personalLeaveRate,
        sickLeave,
        sickLeaveRate,
        workRateDayoff,
        workRateDayoffRate,
        daysOff,
        workplaceAddress,
        reason
    });

    try {
        await workplace.save();
        res.json(workplace );
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
 
});



// Update a workplace by its workplaceId
router.put('/update/:workplaceId', async (req, res) => {
//    console.log('hello');
    const workplaceIdToUpdate = req.params.workplaceId;
    const updateFields = req.body;

    try {
        // Find the resource by ID and update it
        const updatedResource = await Workplace.findByIdAndUpdate(
            workplaceIdToUpdate ,
            updateFields ,
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
