const DI = require('~infrastructure/DI.js')
const awilix = require('awilix')
const UserController = require('~infrastructure/api/user/controller')
const AuthController = require('~infrastructure/api/auth/controller')
const authExistsMiddleware = require('~infrastructure/middlewares/existsAuthMiddleware')

const apiDI = DI.createScope()

apiDI.register({
  userController: awilix.asClass(UserController),
  authController: awilix.asClass(AuthController),
  authExistsMiddleware: awilix.asFunction(authExistsMiddleware),
})

module.exports = apiDI
