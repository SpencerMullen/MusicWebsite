// Schemas for entry validation using Joi
const Joi = require('joi');

module.exports.entrySchema = Joi.object({
    entry: Joi.object({
        id: Joi.string().required(),
        addedBy: Joi.object({
            userId: Joi.string().required(),
            username: Joi.string().required()
        }).required(),
        reviewed: Joi.boolean().required(),
        type: Joi.string().required(),
        title: Joi.string().required(),
        artist: Joi.string().required(),
        releaseDate: Joi.date().required(),
        rating: Joi.number().min(1).max(10),
        review: Joi.string(),
        reviewDate: Joi.date(),
        genre: Joi.string().required(),
        cover: Joi.object({
            url: Joi.string().required(),
            filename: Joi.string().required()
        }).required(),
        review: Joi.object({
            rating: Joi.number().min(1).max(10),
            reviewText: Joi.string(),
            reviewDate: Joi.date()
        })
    }).required()
});
