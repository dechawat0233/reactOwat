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

// Create a new leave request
router.post('/create', async (req, res) => {
    try {
        const leave = new welfare (req.body);
        await leave.save();
        res.status(201).send(leave);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/search', async (req, res) => {
    try {
        const { year, month } = req.body;

        // Validate input
        if (!year || !month) {
            return res.status(400).json({ message: 'Year and month are required.' });
        }

        // Find welfare records matching the year and month
        const results = await Welfare.find({ year: year, month: month });

        if (results.length === 0) {
            return res.status(404).json({ message: 'No records found for the specified year and month.' });
        }

        res.status(200).json(results);
    } catch (error) {
        console.error('Error searching welfare records:', error);
        res.status(500).json({ message: 'Server error while searching records.' });
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