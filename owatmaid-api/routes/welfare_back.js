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
const { el, ca } = require('date-fns/locale');

// Define CRUD routes for Welfare model
router.get('/list', async (req, res) => {
  try {
    const welfareRecords = await welfare.find();
    res.json(welfareRecords);
  } catch (err) {
    // res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const welfareRecord = await welfare.findById(req.params.id);
    if (!welfareRecord) return res.status(404).json({ message: 'Record not found' });
    res.json(welfareRecord);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/create', async (req, res) => {
  const welfareRecord = new welfare(req.body);
  try {
    const newRecord = await welfareRecord.save();
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const updatedRecord = await welfare.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRecord) return res.status(404).json({ message: 'Record not found' });
    res.json(updatedRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedRecord = await welfare.findByIdAndDelete(req.params.id);
    if (!deletedRecord) return res.status(404).json({ message: 'Record not found' });
    res.json({ message: 'Record deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;