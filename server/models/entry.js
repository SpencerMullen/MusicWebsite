const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for the entry
const EntrySchema = new Schema({
    id: Number,
    addedBy: {
        id: String,
        username: String
    },
    reviewed: Boolean,
    title: String,
    name: String,
    artist: String,
    releaseDate: Date,
    genre: String,
    cover: {
        url: String,
        filename: String
    },
    // Rating and review are optional since they are not required when creating an entry
    // Same applies to other reviews
    rating: Number,
    review: String,
    reviewDate: Date,
    // IMPLEMENT
    //comments: [String]
});

// Export the model
module.exports = mongoose.model('Entry', EntrySchema);