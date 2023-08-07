const awilix = require('awilix');
const UserService = require('../application/user.service')
const PrismaUserRepository = require('./db/user/repository')
const { PrismaClient } = require("@prisma/client")
const container = awilix.createContainer()

container.register({
  userService: awilix.asClass(UserService),
  userRepository: awilix.asClass(PrismaUserRepository),
  db: awilix.asValue(new PrismaClient())
});


module.exports = container