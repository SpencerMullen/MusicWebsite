// Routes for entry
const express = require('express');
const router = express.Router();
const Entry = require('../models/entry');
const catchAsync = require('../utils/catchAsync');
const validateEntry = require('../middleware/validateEntry');
const { storage } = require('../cloudinary');
const multer = require('multer');
const upload = multer({ storage: storage });
const uuid = require('uuid');

router.route('/')
    // Get all entries
    .get(catchAsync(async (req, res, next) => {
        const entries = await Entry.find({});
        // console.log("Getting all entries");
        res.json(entries);
    }))
    // Create a new entry
    .post(upload.single('image'), validateEntry, catchAsync(async (req, res, next) => {
        try {
            // Get the file from the request
            const result = req.file;
            // Entry from the request
            const reqEntry = JSON.parse(req.body.entry);

            // Create the new entry with Cloudinary image data
            const newEntry = new Entry({
                id: uuid.v4(), // Generate a UUID
                reviewed: false,
                type: reqEntry.type,
                title: reqEntry.title,
                artist: reqEntry.artist,
                releaseDate: new Date(reqEntry.releaseDate),
                genre: reqEntry.genre,
                cover: {
                    url: result.path,
                    filename: result.filename
                },
                review: {
                    rating: 0,
                    reviewDate: null,
                    reviewText: ""
                }
            });
            // console.log("newEntry: " + newEntry);

            // Save the new entry to the database
            await newEntry.save();
            // console.log("New entry created: " + newEntry);
            res.json(newEntry);
        } catch (err) {
            console.log(err);
        }
    }));

router.route('/:id')
    // Get a specific entry
    .get(catchAsync(async (req, res, next) => {
        const entry = await Entry.findOne({ id: req.params.id });
        // console.log("Getting entry with id: " + req.params.id);
        res.json(entry);
    }))
    // Replace / update an entry
    .put(validateEntry, catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const entry = await Entry.findOneAndUpdate({ id }, { ...req.body.entry }, { new: true });
        console.log("req.body.entry: " + req.body.entry)
        console.log("Updating entry with id: " + req.params.id);
        res.json(entry);
    }))
    // Delete an entry
    .delete(catchAsync(async (req, res, next) => {
        const { id } = req.params;
        await Entry.findOneAndDelete({ id });
        console.log("Deleting entry with id: " + req.params.id);
        res.json({ message: 'Deleted' });
    }));

module.exports = router;