// Routes for entry
const express = require('express');
const router = express.Router();
const Entry = require('../models/entry');
const catchAsync = require('../utils/catchAsync');
const convertToUTC = require('../utils/convertToUTC');
const validateEntry = require('../middleware/validateEntry');
// const userAuth = require('../middleware/userAuth').ensureAuthenticated;
const adminAuth = require('../middleware/userAuth').ensureAuthenticatedAndAdmin;
const { storage } = require('../cloudinary');
const multer = require('multer');
const upload = multer({ storage: storage });
const uuid = require('uuid');
const { cloudinary } = require('../cloudinary');
const { buildPipeline } = require('../utils/buildPipeline');

router.route('/')
    // Get all entries
    .get(catchAsync(async (req, res, next) => {
        try {
            // Filter the entries
            const filters = req.query.filters;
            // console.log("Filters: " +  JSON.stringify(filters));
            const pipeline = buildPipeline(filters);
    
            // Get the entries from the database
            const entries = await Entry.aggregate(pipeline);
            res.json(entries);
        } catch (err) {
            console.log(err);
        }
    }))
    // Create a new entry
    .post(adminAuth, upload.single('image'), validateEntry, catchAsync(async (req, res, next) => {
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
                releaseDate: convertToUTC(new Date(reqEntry.releaseDate)),
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
    .put(adminAuth, validateEntry, catchAsync(async (req, res, next) => {
        // Entry from the request and add releaseDate and reviewDate to prevent day errors
        // console.log("REQ", req.body.entry);
        reqEntry = JSON.parse(req.body.entry);
        // If dates aren't in UTC change them
        const updatedEntry = {
            id: reqEntry.id,
            reviewed: reqEntry.reviewed,
            type: reqEntry.type,
            title: reqEntry.title,
            artist: reqEntry.artist,
            releaseDate: convertToUTC(new Date(reqEntry.releaseDate)),
            genre: reqEntry.genre,
            cover: {
                url: reqEntry.cover.url,
                filename: reqEntry.cover.filename
            },
            review: {
                rating: reqEntry.review.rating,
                reviewDate: convertToUTC(new Date(reqEntry.review.reviewDate)),
                reviewText: reqEntry.review.reviewText
            }
        }
        // console.log("Updated entry: " + updatedEntry);
        // Get the id and update the entry
        const { id } = req.params;
        const entry = await Entry.findOneAndUpdate({ id }, updatedEntry, { new: true });
        // console.log("Updated entry: " + entry);
        // console.log("Updating entry with id: " + req.params.id);
        res.json(entry);
    }))
    // Delete an entry
    .delete(adminAuth, catchAsync(async (req, res, next) => {
        const { id } = req.params;
        // Find the Entry by ID
        const entry = await Entry.findOne({ id });
        if (!entry) {
            return res.status(404).json({ message: 'Entry not found' });
        }
        // Delete the image from Cloudinary using the filename
        const filename = entry.cover.filename;
        if (filename) {
            // Delete the image from Cloudinary
            await cloudinary.uploader.destroy(filename);
        }
        // Delete the entry from the database
        await Entry.findOneAndDelete({ id });
        // console.log("Deleting entry with id: " + req.params.id);
        res.json({ message: 'Deleted' });
    }));

router.route('/:id/image')
    // Update an entry's image by uploading a new image
    .put(adminAuth, upload.single('image'), catchAsync(async (req, res, next) => {
        // Get the file from the request
        const result = req.file;
        // Get the id and update the entry
        const { id } = req.params;
        const entry = await Entry.findOne({ id });
        // Delete the image from Cloudinary using the filename
        const filename = entry.cover.filename;
        if (filename) {
            // Delete the image from Cloudinary
            await cloudinary.uploader.destroy(filename);
        }
        // Update the entry with the new image data
        entry.cover.url = result.path;
        entry.cover.filename = result.filename;
        // Save the updated entry to the database
        await entry.save();
        // console.log("Updating entry image with id: " + req.params.id);
        res.json(entry);
    }));

router.route('/:id/image2')
    // Update an entry's image by inputting a new image url
    .put(adminAuth, catchAsync(async (req, res, next) => {
        // Get the id and update the entry
        const { id } = req.params;
        const entry = await Entry.findOne({ id });
        // Delete the image from Cloudinary using the filename
        const filename = entry.cover.filename;
        if (filename) {
            // Delete the image from Cloudinary
            await cloudinary.uploader.destroy(filename);
        }
        // Update the entry with the new image data
        entry.cover.url = req.body.imageUrl;
        entry.cover.filename = "";
        // Save the updated entry to the database
        await entry.save();
        // console.log("Updating entry image with id: " + req.params.id);
        res.json(entry);
    }));

router.route('/discogs')
    // Post a new entry from using search data from Discogs api
    .post(adminAuth, catchAsync(async (req, res, next) => {
        // Entry from the request
        const reqEntry = req.body.entry;
        // Create the new entry with Discogs data
        const newEntry = new Entry({
            id: uuid.v4(), // Generate a UUID
            reviewed: false,
            type: reqEntry.type,
            title: reqEntry.title,
            artist: reqEntry.artist,
            releaseDate: convertToUTC(new Date(reqEntry.releaseDate)),
            genre: reqEntry.genre,
            cover: {
                url: reqEntry.cover.url,
                filename: reqEntry.cover.filename
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
    }));

module.exports = router;