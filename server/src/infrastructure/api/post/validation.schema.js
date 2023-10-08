const Joi = require('joi')
const createPost = Joi.object({
  caption: Joi.string().min(2).max(255).required()
}).unknown()

const updatePost = Joi.object({
  caption: Joi.string().min(2).max(255)
}).min(1).unknown()

module.exports = { updatePost, createPost }
