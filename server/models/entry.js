const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for the entry
const EntrySchema = new Schema({
    id: Number,
    reviewed: Boolean,
    title: String,
    name: String,
    artist: String,
    releaseDate: Date,
    rating: Number,
    review: String,
    reviewDate: Date,
    genre: [String],
    cover: {
        url: String,
        filename: String
    },
    // IMPLEMENT
    //comments: [String]
});

// Export the model
module.exports = mongoose.model('Entry', EntrySchema);