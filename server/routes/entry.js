// Routes for entry
const express = require('express');
const router = express.Router();
const Entry = require('../models/entry');
const catchAsync = require('../utils/catchAsync');
const validateEntry = require('../middleware/validateEntry');
const { storage } = require('../cloudinary');
const multer = require('multer');
const upload = multer({ storage });
const uuid = require('uuid');

router.route('/')
    // Get all entries
    .get(catchAsync(async (req, res, next) => {
        const entries = await Entry.find({});
        res.json(entries);
    }))
    // Create a new entry
    .post(upload.single('file'), validateEntry, catchAsync(async (req, res, next) => {
        // Create the new entry with Cloudinary image data
        const newEntry = new Entry({
            ...req.body.entry,
            id: uuid.v4(), // Generate a UUID
            reviewed: false,
            cover: {
                url: file.path,
                filename: file.filename
            },
            review: {
                rating: null,
                reviewDate: null,
                reviewText: null
            }
        });

        await newEntry.save();
        console.log(newEntry);
        res.json(newEntry);
    }));

router.route('/:id')
    // Get a specific entry
    .get(catchAsync(async (req, res, next) => {
        console.log(req.params.id);
        const entry = await Entry.findOne({ id: req.params.id });
        res.json(entry);
    }))
    // Replace / update an entry
    .put(validateEntry, catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const entry = await Entry.findOneAndUpdate({ id }, { ...req.body.entry }, { new: true });
        res.json(entry);
    }))
    // Delete an entry
    .delete(catchAsync(async (req, res, next) => {
        const { id } = req.params;
        await Entry.findOneAndDelete({ id });
        res.json({ message: 'Deleted' });
    }));

module.exports = router;