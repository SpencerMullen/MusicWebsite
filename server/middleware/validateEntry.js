const { entrySchema } = require('../schemas/entry.js');
const ExpressError = require('../utils/ExpressError');

// Custom validation middleware using Joi schema
function validateEntry(req, res, next) {
    const { error } = entrySchema.validate(req.body.entry);

    if (error) {
        const message = error.details.map(el => el.message).join(',');
        console.log(message);
        throw new ExpressError(message, 400);
    }

    next(); // Proceed to the route handler if validation passes
}

module.exports = validateEntry;