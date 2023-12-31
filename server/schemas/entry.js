// Schemas for entry validation using Joi
const Joi = require('joi');

module.exports.entrySchema = Joi.object({
    id: Joi.string(),
    reviewed: Joi.boolean(),
    type: Joi.string().required(),
    title: Joi.string().required(),
    artist: Joi.string().required(),
    releaseDate: Joi.date(),
    genre: Joi.string().allow('').required(),
    cover: Joi.object({
        url: Joi.string(),
        filename: Joi.string().allow('')
    }),
    review: Joi.object({
        rating: Joi.number().min(0).max(10),
        reviewText: Joi.string().allow(''),
        reviewDate: Joi.date().allow(null)
    }),
    _id: Joi.string(),
});
