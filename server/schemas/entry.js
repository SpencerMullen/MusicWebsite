// Schemas for entry validation using Joi
const Joi = require('joi');

module.exports.entrySchema = Joi.object({
    entry: Joi.object({
        title: Joi.string().required(),
        name: Joi.string().required(),
        artist: Joi.string().required(),
        releaseDate: Joi.date().required(),
        rating: Joi.number().min(1).max(10),
        review: Joi.string(),
        reviewDate: Joi.date(),
        genre: Joi.string().required(),
    }).required()
});
