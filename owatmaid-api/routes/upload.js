const connectionString = require('../config');

var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const readline = require('readline');

const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

// Connect to MongoDB
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Utility function to format the date
function formatDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    return `${day}-${month}-${year}`;
}

// Create the uploads folder dynamically if it doesn't exist
const UPLOADS_DIR = path.join(__dirname, '../uploads/');
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Set up multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_DIR); // Folder where files will be saved
    },
    filename: (req, file, cb) => {
        const fileBaseName = path.basename(file.originalname, path.extname(file.originalname)); // Remove extension
        const uniqueName = `${formatDate()}-${fileBaseName}`; // No trailing hyphen or extension duplication
        cb(null, uniqueName + path.extname(file.originalname)); // Add the original file extension back
    },
});

const upload = multer({ storage: storage });

// Route to handle file upload
router.post('/upload', upload.single('file'), (req, res) => {
    // Log the request to debug
    console.log('Received upload request:', req.body);
    console.log('Uploaded file details:', req.file);

    // Check if the file exists in the request
    if (!req.file) {
        console.error('No file uploaded.');
        return res.status(400).json({ message: 'No file uploaded.' });
    }

    // Construct the file path
    const filePath = path.join(UPLOADS_DIR, req.file.filename);

    // Log the file path to debug
    console.log('Constructed file path:', filePath);

    // Check if the file exists on the file system
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('File does not exist:', err);
            return res.status(400).json({ message: `File does not exist on the server: ${filePath}` });
        }

        // Read the file line by line using readline
        const readInterface = readline.createInterface({
            input: fs.createReadStream(filePath),
            output: process.stdout,
            console: false
        });

        const lines = []; // Store the lines if needed
        readInterface.on('line', (line) => {
            console.log(`Line from file: ${line}`);
            lines.push(line);
            // Process the line here if needed
        });

        readInterface.on('close', () => {
            console.log('Finished reading the file.');
            res.status(200).json({
                message: 'File uploaded and processed!',
                filename: req.file.filename,
                linesProcessed: lines.length // Optionally send the number of lines processed
            });
        });

        readInterface.on('error', (error) => {
            console.error('Error reading the file:', error);
            return res.status(500).json({ message: 'Error processing file.' });
        });
    });
});

module.exports = router;
