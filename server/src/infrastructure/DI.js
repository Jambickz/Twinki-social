const awilix = require('awilix')

const UserService = require('~application/user.service')
const AuthService = require('~application/auth.service')
const PostService = require('~application/post.service')

const PrismaUserRepository = require('./db/user/repository')
const PrismaAuthRepository = require('./db/auth/repository')
const PrismaPostRepository = require('./db/post/repository')

const JwtService = require('./services/jwt.service')
const MailerService = require('./services/mailer.service')

const { PrismaClient } = require('@prisma/client')

const container = awilix.createContainer()
container.register({
  userService: awilix.asClass(UserService),
  userRepository: awilix.asClass(PrismaUserRepository),
  authService: awilix.asClass(AuthService),
  authRepository: awilix.asClass(PrismaAuthRepository),
  tokenService: awilix.asClass(JwtService),
  mailService: awilix.asClass(MailerService),
  postService: awilix.asClass(PostService),
  postRepository: awilix.asClass(PrismaPostRepository),
  db: awilix.asValue(new PrismaClient())
})

module.exports = container
