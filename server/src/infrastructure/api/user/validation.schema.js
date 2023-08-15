const Joi = require('joi')

module.exports = Joi.object({
  email: Joi.string().email().max(255),
  username: Joi.string().min(4).max(15).required(),
  password: Joi.string().min(8).max(128).required(),
  profileName: Joi.string().max(50),
  bio: Joi.string().max(160)
}).unknown()
