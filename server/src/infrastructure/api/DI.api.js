const DI = require('~infrastructure/DI.js')
const awilix = require('awilix')
const UserController = require('~infrastructure/api/user/controller')
const AuthController = require('~infrastructure/api/auth/controller')

const apiDI = DI.createScope()

apiDI.register({
  userController: awilix.asClass(UserController),
  authController: awilix.asClass(AuthController)
})

module.exports = apiDI
