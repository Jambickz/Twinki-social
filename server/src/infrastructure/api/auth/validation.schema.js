const Joi = require('joi')

const registration = Joi.object({
  profileName: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().max(255).required(),
  password: Joi.string().min(8).max(128).required()
}).unknown()

const login = Joi.object({
  login: Joi.string().min(4).max(255).required(),
  password: Joi.string().min(8).max(128).required()
}).unknown()

const code = Joi.object({
  email: Joi.string().email().max(255).required(),
  code: Joi.number().integer().min(100000).max(999999).required()
}).unknown()

const email = Joi.object({
  email: Joi.string().email().max(255).required()
}).unknown()

module.exports = { registration, login, code, email }
