const express = require('express');
const router = express.Router();
const outsider = require('./models/outsiderModel');

// Create a new outsider 
router.post('/', async (req, res) => {
  try {
    const newOutsider = new outsider (req.body);
    const savedOutsider = await newOutsider.save();
    res.status(201).json(savedOutsider );
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Search outsiders by workplaceId and date
router.post('/search', async (req, res) => {
  const { workplaceId, date } = req.body;

  try {
    // Build the query object
    const query = {};
    if (workplaceId) query.workplaceId = workplaceId;
    if (date) query.date = date; // Assuming exact match for the date string

    // Execute the search query
    const outsiders = await outsider.find(query);
    res.status(200).json(outsiders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

//======test 
router.get('/listoutsiderdelete', async (req, res) => {
  try {
    // Delete all data
    const result = await outsider.deleteMany({});
    res.status(200).json({ message: 'All outsiders deleted successfully', result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Get all outsider 
router.get('/', async (req, res) => {
  try {
    const outsiders = await outsider .find();
    res.status(200).json(outsiders );
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get a single outsider by ID
router.get('/:id', async (req, res) => {
  try {
    const outsiderX = await outsider .findById(req.params.id);
    if (!outsiderX ) return res.status(404).json({ error: 'Outsider not found' });
    res.status(200).json(outsiderX );
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a outsider by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedSetting = await outsider.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedSetting)
      return res.status(404).json({ error: 'Outsider not found' });
    res.status(200).json(updatedSetting);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a outsider by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedSetting = await outsider.findByIdAndDelete(req.params.id);
    if (!deletedSetting)
      return res.status(404).json({ error: 'Outsider not found' });
    res.status(200).json({ message: 'Outsider deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
