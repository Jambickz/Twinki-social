const express = require('express')
const router = express.Router()
const DI = require('~infrastructure/api/DI.api.js')
const validationSchema = require('~infrastructure/middlewares/validateMiddleware')
const { registration, login, code, email } = require('./validation.schema')

module.exports = () => {
  const controller = DI.resolve('authController')
  const authCheck = DI.resolve('authExistsMiddleware')
  router.post('/auth/registration', validationSchema(registration), controller.registration.bind(controller))
  router.post('/auth/login', validationSchema(login), controller.login.bind(controller))
  router.post('/auth/logout', authCheck, controller.logout.bind(controller))
  router.post('/auth/create-code', validationSchema(email), controller.sendActivationCode.bind(controller))
  router.post('/auth/check-code', validationSchema(code), controller.checkActivationCode.bind(controller))
  return router
}
