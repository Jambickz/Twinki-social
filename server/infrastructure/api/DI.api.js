const DI = require('../DI')
const awilix = require('awilix');
const UserController = require('./user/controller')

const apiDI = DI.createScope()

apiDI.register({
  userController: awilix.asClass(UserController)
})

module.exports = apiDI