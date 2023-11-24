const connectionString = require('../config');

var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

//Connect mongodb
mongoose.connect(connectionString, {
    useNewUrlParser: true, useUnifiedTopology:
        true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Define add salary schema
const addSalarySchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: true
    },
    employeeName: {
        type: String,
        required: true
    },
    onUpdate: {
        type: String,
        required: true
    },

    addSalary: [{
        addSalaryId: String,
        addSalaryName: String,
        addSalary: String,
        message: String,
    }],
    minusSalary: [{
        addSalaryId: String,
        addSalaryName: String,
        addSalary: String,
        message: String,
    }],

});

// Create the add salary model based on the schema
const addSalaryEmployee = mongoose.model('addSalary', addSalarySchema );


// Get list of workplaces
router.get('/list', async (req, res) => {
    const addSalarys = await addSalaryEmployee.find();
    res.json(addSalarys);
});


// Get  add salary by Id
router.get('/:employeeId', async (req, res) => {
    try {
        const addsalary = await addSalaryEmployee.findOne({ employeeId: req.params.employeeId });
        if (addsalary) {
            res.json(addsalary);
        } else {
            res.status(404).json({ error: 'workplace not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }

});


router.post('/search', async (req, res) => {
});


// Create new add salary
router.post('/create', async (req, res) => {
    try {
        const {
            employeeId,
            employeeName,
            onUpdate,
            addSalary,
            minusSalary,
        } = req.body;

        // Create add salary document using the model
        const newAddSalary = await addSalaryEmployee.create({
            employeeId,
            employeeName,
            onUpdate,
            addSalary,
            minusSalary,
        });

        res.json(newAddSalary); // Send the saved document as the response
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
});



// Update a add salary by its employeeId
router.put('/update/:employeeId', async (req, res) => {
    //    console.log('hello');
    const addsalaryIdToUpdate = req.params.employeeId;
    const updateFields = req.body;

    try {
        // Find the resource by ID and update it
        const updatedResource = await addSalaryEmployee.findByIdAndUpdate(
            addsalaryIdToUpdate,
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
