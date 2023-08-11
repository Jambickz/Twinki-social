const express = require('express')
const router = express.Router()
const DI = require('../DI.api')
const existsAuthMiddleware = require('../../helpers/existsAuthMiddleware')
module.exports = () => {
  const controller = DI.resolve('userController')
  router.get('/user/:id', controller.getUser.bind(controller))
  router.get('/user', controller.getUser.bind(controller))
  router.post('/user/create', controller.createUser.bind(controller))
  router.put('/user/:id', controller.updateUser.bind(controller))
  router.delete('/user/:id', controller.removeUser.bind(controller))
  return router
}
