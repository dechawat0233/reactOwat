const express = require('express');
const router = express.Router();
const setting = require('./models/settingModel');
// const basicsettingmodel  = null;

// Create a new BasicSetting
router.post('/', async (req, res) => {
  try {
    const newSetting = new setting(req.body);
    const savedSetting = await newSetting.save();
    res.status(201).json(savedSetting);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all BasicSettings
router.get('/', async (req, res) => {
  try {
    const settings = await setting.find();
    res.status(200).json(settings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get a single BasicSetting by ID
router.get('/:id', async (req, res) => {
  try {
    const setting = await setting.findById(req.params.id);
    if (!setting) return res.status(404).json({ error: 'Setting not found' });
    res.status(200).json(setting);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a BasicSetting by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedSetting = await setting.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedSetting)
      return res.status(404).json({ error: 'Setting not found' });
    res.status(200).json(updatedSetting);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a BasicSetting by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedSetting = await setting.findByIdAndDelete(req.params.id);
    if (!deletedSetting)
      return res.status(404).json({ error: 'Setting not found' });
    res.status(200).json({ message: 'Setting deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
