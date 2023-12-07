const connectionString = require('../config');

var express = require('express');
const multer = require('multer');

var router = express.Router();
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');


const extractEmployeeId = (req, res, next) => {
  const employeeId = req.headers['employee-id'];

  if (!employeeId) {
    return res.status(400).send('Employee ID is missing in the headers');
  }

  req.employeeId = employeeId;
  next();
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const employeeId = req.employeeId;
    const fileExtension = file.originalname.split('.').pop();
    const newFilename = `${employeeId}.${fileExtension}`;
    console.log('Employee ID:', employeeId);
    console.log('Original Filename:', file.originalname);
    console.log('New Filename:', newFilename);

    cb(null, newFilename);
  },
});

const upload = multer({ storage: storage });

router.post('/upload', extractEmployeeId, upload.single('image'), (req, res) => {
  // Do something with the uploaded file
  res.status(200).send('File uploaded successfully!');
});


module.exports = router;