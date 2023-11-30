const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for the entry
const EntrySchema = new Schema({
    id: {
        type: String,
        required: true,
        unqiue: true
    },
    reviewed: {
        type: Boolean,
        default: false,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    cover: {
        url: {
            type: String,
            required: true
        },
        filename: {
            type: String,
            required: true
        }
    },
    review: {
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
    }
}, {
    toJSON: {
        transform: (doc, ret) => {
            // Hide the MongoDB _id and rename id to entryId
            delete ret._id;
            return ret;
        },
    },
});

// Export the model
module.exports = mongoose.model('Entry', EntrySchema, 'entries');