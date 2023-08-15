const express = require('express')
const router = express.Router()
const DI = require('~infrastructure/api/DI.api')
module.exports = () => {
  // const controller = DI.resolve('userController')
  // const authCheck = DI.resolve('authExistsMiddleware')

  // router.get('/user/:id', authCheck, controller.getUser.bind(controller))
  // router.get('/user', authCheck, controller.getUser.bind(controller))
  // router.post('/user/create', authCheck, controller.createUser.bind(controller))
  // router.delete('/user/:id', authCheck, controller.removeUser.bind(controller))
  return router
}
