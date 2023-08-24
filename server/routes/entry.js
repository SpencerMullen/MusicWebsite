// Routes for entry
const express = require('express');
const router = express.Router();
const Entry = require('../models/entry');
const catchAsync = require('../utils/catchAsync');
const expressError = require('../utils/expressError');
const validateEntry = require('../middleware/validateEntry');

router.route('/entries')
    // Get all entries
    .get(catchAsync(async (req, res) => {
        const entries = await Entry.find({});
        res.json(entries);
    }))
    // Create a new entry
    .post(validateEntry, catchAsync(async (req, res) => {
        const entry = new Entry(req.body.entry);
        await entry.save();
        res.json(entry);
    }));

router.route('/entries/:id')
    // Get a specific entry
    .get(catchAsync(async (req, res) => {
        const entry = await Entry.findById(req.params.id);
        res.json(entry);
    }))
    // Replace / update an entry
    .put(validateEntry, catchAsync(async (req, res) => {
        const { id } = req.params;
        const entry = await Entry.findByIdAndUpdate(id, { ...req.body.entry });
        res.json(entry);
    }))
    // Delete an entry
    .delete(catchAsync(async (req, res) => {
        const { id } = req.params;
        await Entry.findByIdAndDelete(id);
        res.json({ message: 'Deleted' });
    }));

module.exports = router;