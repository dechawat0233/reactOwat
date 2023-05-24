// Import dependencies
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const employeeController = require('./controllers/employeeController');

// Set up environment variables

// Set up database connection
mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true, useUnifiedTopology: 
true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
console.log('mongodb connected');

// Set up express app
const app = express();
app.use(express.json());
app.use(cors());

app.post('/employees', employeeController.createEmployee);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
