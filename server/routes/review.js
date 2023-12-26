// Routes for user reviews
const express = require('express');
const router = express.Router();
const Review = require('../models/review');
const catchAsync = require('../utils/catchAsync');
const userAuth = require('../middleware/userAuth').ensureAuthenticated;

router.route('/')
    // Get all reviews for a given entry
    .get(catchAsync(async (req, res, next) => {
        const { entryId } = req.query;
        const reviews = await Review.find({ entryId: entryId });
        res.json(reviews);
    }))