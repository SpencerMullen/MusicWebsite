const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for the review
const ReviewSchema = new Schema({
    entryId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    username: {
        type: String
    },
    rating: {
        type: Number,
        min: 0,
        max: 10
    },
    reviewDate: {
        type: Date
    },
    reviewText: {
        type: String
    }
}, {
    toJSON: {
        virtuals: true
    }
});

module.exports = mongoose.model('Review', ReviewSchema, 'reviews');