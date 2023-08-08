const awilix = require('awilix');
const UserService = require('../application/user.service')
const AuthService = require('../application/auth.service')

const PrismaUserRepository = require('./db/user/repository')
const PrismaAuthRepository = require('./db/auth/repository')

const JwtService = require('./services/jwt.service')
const { PrismaClient } = require("@prisma/client")
const container = awilix.createContainer()

container.register({
  userService: awilix.asClass(UserService),
  userRepository: awilix.asClass(PrismaUserRepository),
  authService: awilix.asClass(AuthService),
  authRepository: awilix.asClass(PrismaAuthRepository),
  tokenService: awilix.asClass(JwtService),
  db: awilix.asValue(new PrismaClient())
});


module.exports = container