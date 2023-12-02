const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
        required: true
    },
});

// Add passport-local-mongoose to the UserSchema
UserSchema.plugin(passportLocalMongoose);

// Ensure that only "user" role can be registered
UserSchema.statics.register = function (user, password) {
    if (user.role !== 'user') {
        return Promise.reject(new Error('Only users can be registered'));
    }
    return User.register(user, password);
};

// Export the model
module.exports = mongoose.model('User', UserSchema);
