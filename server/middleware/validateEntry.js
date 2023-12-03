const { entrySchema } = require('../schemas/entry.js');
const ExpressError = require('../utils/expressError');
const { cloudinary } = require('../cloudinary');

// Custom validation middleware using Joi schema
function validateEntry(req, res, next) {
    // Check if it's a GET request (update/edit)
    const isGetReq = req.method === 'GET';
    // console.log("Validating entry: " + req.body.entry)
    const { error } = entrySchema.validate(JSON.parse(req.body.entry));
    if (error) {
        const message = error.details.map(el => el.message).join(',');
        console.log(message);
        // Check if there is a file to delete and if it is a GET request
        if (!isGetReq && req.file) {
            // Delete the file from Cloudinary
            cloudinary.uploader.destroy(req.file.filename);
        }
        throw new ExpressError(message, 400);
    }
    // console.log("Entry validated!");
    next(); // Proceed to the route handler if validation passes
}

module.exports = validateEntry;