const express = require('express')
const router = express.Router()
const DI = require('~infrastructure/api/DI.api.js')
const existsAuthMiddleware = require('~infrastructure/helpers/existsAuthMiddleware')

module.exports = () => {
  const controller = DI.resolve('authController')
  router.post('/auth/register', controller.registration.bind(controller))
  router.post('/auth/login', controller.login.bind(controller))
  router.post('/auth/logout', existsAuthMiddleware, controller.logout.bind(controller))
  router.post('/auth/create-code', controller.sendActivationCode.bind(controller))
  router.post('/auth/check-code', controller.checkActivationCode.bind(controller))
  return router
}
