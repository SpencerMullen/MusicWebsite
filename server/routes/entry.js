// Routes for entry
const express = require('express');
const router = express.Router();
const Entry = require('../models/entry');

router.route('/entries')
    // Get all entries
    .get(async (req, res) => {
        const entries = await Entry.find({});
        res.json(entries);
    })
    // Create a new entry
    .post(async (req, res) => {
        const entry = new Entry(req.body.entry);
        await entry.save();
        res.json(entry);
    });

router.route('/entries/:id')
    // Get a specific entry
    .get(async (req, res) => {
        const entry = await Entry.findById(req.params.id);
        res.json(entry);
    })
    // Replace / update an entry
    .put(async (req, res) => {
        const { id } = req.params;
        const entry = await Entry.findByIdAndUpdate(id, { ...req.body.entry });
        res.json(entry);
    })
    // Delete an entry
    .delete(async (req, res) => {
        const { id } = req.params;
        await Entry.findByIdAndDelete(id);
        res.json({ message: 'Deleted' });
    });

module.exports = router;