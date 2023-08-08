const DI = require('../DI')
const awilix = require('awilix');
const UserController = require('./user/controller')
const AuthController = require('./auth/controller')
const apiDI = DI.createScope()

apiDI.register({
  userController: awilix.asClass(UserController),
  authController: awilix.asClass(AuthController)
})

module.exports = apiDI