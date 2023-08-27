const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for the entry
const EntrySchema = new Schema({
    id: String,
    addedBy: {
        userId: String,
        username: String
    },
    reviewed: Boolean,
    type: String,
    title: String,
    artist: String,
    releaseDate: Date,
    genre: String,
    cover: {
        url: String,
        filename: String
    },
    review: {
        rating: Number,
        reviewText: String,
        reviewDate: Date,
    }
});

// Export the model
module.exports = mongoose.model('Entry', EntrySchema);