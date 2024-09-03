const sURL = 'http://localhost:3000';
const welfare = require('./models/welfareModel');


const axios = require('axios');

var express = require('express');
var router = express.Router();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const { months } = require('moment');
const { el, ca, it } = require('date-fns/locale');
// Create or update a leave request
router.post('/create', async (req, res) => {
    const { employeeId, year, month, record } = req.body;

    try {
        // Check if a welfare record already exists for the given employeeId, year, and month
        let existingWelfare = await welfare.findOne({ employeeId, year, month });

        if (existingWelfare) {
            // Update the existing record with the new information
            // existingWelfare.record.push(...record);
            existingWelfare.record = record;

            await existingWelfare.save();
            res.status(200).send({ message: 'Welfare record updated successfully', data: existingWelfare });
        } else {
            // Create a new welfare record if no matching record exists
            const newWelfare = new welfare(req.body);
            await newWelfare.save();
            res.status(201).send({ message: 'Welfare record created successfully', data: newWelfare });
        }
    } catch (error) {
        res.status(400).send({ error: 'An error occurred while creating/updating the welfare record', details: error.message });
    }
});

// Create a new leave request
// router.post('/create', async (req, res) => {
//     try {
//         const leave = new welfare (req.body);
//         await leave.save();
//         res.status(201).send(leave);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });

router.post('/search', async (req, res) => {
    try {
        const { year, month } = req.body;

        // Validate input
        if (!year || !month) {
            return res.status(400).json({ message: 'Year and month are required.' });
        }

        // Find welfare records matching the year and month
        const results = await welfare.find({ year: year, month: month });

        if (results.length === 0) {
            return res.status(404).json({ message: 'No records found for the specified year and month.' });
        }

        res.status(200).json(results);
    } catch (error) {
        console.error('Error searching welfare records:', error);
        res.status(500).json({ message: 'Server error while searching records.' });
    }
});

//delete all record 
router.get('/listdelete', async (req, res) => {

try {
    const result = await welfare.deleteMany({});
    res.status(200).send({ message: 'All records deleted successfully', deletedCount: result.deletedCount });
} catch (error) {
    res.status(500).send({ error: 'An error occurred while deleting records', details: error.message });
}
});

// Get all leave requests
router.get('/list', async (req, res) => {
    try {
        const leaves = await welfare .find();
        res.send(leaves);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a single leave request by ID
router.get('/leaves/:id', async (req, res) => {
    try {
        const leave = await welfare.findById(req.params.id);
        if (!leave) return res.status(404).send('Leave not found');
        res.send(leave);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a leave request by ID
router.patch('/leaves/:id', async (req, res) => {
    try {
        const leave = await welfare.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!leave) return res.status(404).send('Leave not found');
        res.send(leave);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a leave request by ID
router.delete('/leaves/:id', async (req, res) => {
    try {
        const leave = await welfare.findByIdAndDelete(req.params.id);
        if (!leave) return res.status(404).send('Leave not found');
        res.send(leave);
    } catch (error) {
        res.status(500).send(error);
    }
});


module.exports = router;