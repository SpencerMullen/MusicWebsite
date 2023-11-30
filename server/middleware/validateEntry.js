const { entrySchema } = require('../schemas/entry.js');
const ExpressError = require('../utils/ExpressError');

// Custom validation middleware using Joi schema
function validateEntry(req, res, next) {
    // console.log("Validating entry: " + req.body.entry)
    const { error } = entrySchema.validate(JSON.parse(req.body.entry));
    if (error) {
        const message = error.details.map(el => el.message).join(',');
        console.log(message);
        throw new ExpressError(message, 400);
    }
    // console.log("Entry validated!");
    next(); // Proceed to the route handler if validation passes
}

module.exports = validateEntry;