const express = require('express');
const router = express.Router();
const Welfare = require('./models/welfareModel');

router.get('/listdelete', async (req, res) => {
  try {
    const welfares = await Welfare.deleteMany({});
    res.json(welfares);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Create
router.post('/', async (req, res) => {
  const { year, month, employeeId } = req.body;
  try {
    // Check if a record with the same year, month, and employeeId already exists
    const existingWelfare = await Welfare.findOne({ year, month, employeeId });
    if (existingWelfare) {
      return res.status(400).json({ message: 'Welfare record already exists for this year, month, and employee ID' });
    }

    const newWelfare = new Welfare(req.body);
    const savedWelfare = await newWelfare.save();
    res.status(201).json(savedWelfare);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Read All
router.get('/', async (req, res) => {
  try {
    const welfares = await Welfare.find();
    res.json(welfares);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Read One
router.get('/:id', getWelfare, (req, res) => {
  res.json(res.welfare);
});

// Read One by year, month, and employeeId
router.get('/search', async (req, res) => {
  const { year, month, employeeId } = req.query;
  try {
    const welfare = await Welfare.findOne({ year, month, employeeId });
    if (!welfare) return res.status(404).json({ message: 'Welfare not found' });
    res.json(welfare);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update
router.put('/:id', getWelfare, async (req, res) => {
  Object.assign(res.welfare, req.body);
  try {
    const updatedWelfare = await res.welfare.save();
    res.json(updatedWelfare);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete
router.delete('/:id', getWelfare, async (req, res) => {
  try {
    await res.welfare.remove();
    res.json({ message: 'Deleted Welfare' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete by Employee ID
router.delete('/employee/:employeeId', async (req, res) => {
  const { employeeId } = req.params;
  try {
    const result = await Welfare.deleteMany({ employeeId: employeeId });
    res.json({ message: `Welfare records for employee ID ${employeeId} deleted`, deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Delete All
router.get('/test', async (req, res) => {
  try {
    await Welfare.deleteMany({});
    res.json({ message: 'All Welfare records deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get welfare by ID
async function getWelfare(req, res, next) {
  let welfare;
  try {
    welfare = await Welfare.findById(req.params.id);
    if (!welfare) return res.status(404).json({ message: 'Welfare not found' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.welfare = welfare;
  next();
}

module.exports = router;
