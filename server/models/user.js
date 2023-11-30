const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
        required: true
    },
});

// Add passport-local-mongoose to the UserSchema
UserSchema.plugin(passportLocalMongoose);

// Export the model
module.exports = mongoose.model('User', UserSchema, 'users');