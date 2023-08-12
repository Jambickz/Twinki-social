const UserRepository = require('~domain/user/repository')
const UserMapper = require('./mapper')

module.exports = class PrismaUserRepository extends UserRepository {
  constructor ({ db }) {
    super()
    this.db = db
    this.userMapper = UserMapper
  }

  async createUser (dataUser) {
    try {
      const domainUser = this.userMapper.toDomain(dataUser)
      domainUser.roles = { connect: { roleId: 1 } }
      const newUser = await this.db.user.create({
        data: domainUser
      })
      return this.userMapper.toDomain(newUser)
    } catch (e) {
      throw new Error('Failed to create user:' + e.message)
    }
  }

  async updateUser (dataUser) {
    try {
      const domainUser = this.userMapper.toDomain(dataUser)
      const updatedUser = await this.db.user.update({
        where: { userId: domainUser.userId },
        data: domainUser
      })
      return this.userMapper.toDomain(updatedUser)
    } catch (e) {
      throw new Error('Failed to update user: ' + e.message)
    }
  }

  async removeUser (userId) {
    try {
      const existingUser = await this.db.user.findUnique({
        where: { userId }
      })

      if (existingUser && existingUser.deletedAt !== null) {
        return null
      }

      const deletedUser = await this.db.user.update({
        where: { userId },
        data: {
          deletedAt: new Date()
        }
      })

      return this.userMapper.toDomain(deletedUser)
    } catch (e) {
      throw new Error('Failed to "delete" user: ' + e.message)
    }
  }

  async getUser (userId) {
    try {
      const user = await this.db.user.findUnique({
        where: { userId }
      })
      if (user) return this.userMapper.toDomain(user)
      else throw new Error('Failed to find user ')
    } catch (e) {
      throw new Error('Failed to fetch user : ' + e.message)
    }
  }

  async getUsers () {
    try {
      const users = await this.db.user.findMany()
      return users.map(user => this.userMapper.toDomain(user))
    } catch (e) {
      throw new Error('Failed to fetch users: ' + e.message)
    }
  }

  async getByUsernameOrEmail (usernameOrEmail) {
    try {
      const user = await this.db.user.findFirst({
        where: {
          OR: [
            { username: usernameOrEmail },
            { email: usernameOrEmail }
          ]
        }
      })
      if (user) return this.userMapper.toDomain(user)
      else throw new Error('Failed to find user')
    } catch (e) {
      throw new Error('Failed to fetch user: ' + e.message)
    }
  }
}
