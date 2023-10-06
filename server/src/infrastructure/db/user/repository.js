const UserRepository = require('~domain/user/repository')
const UserMapper = require('./mapper')

module.exports = class PrismaUserRepository extends UserRepository {
  constructor ({ db }) {
    super()
    this.db = db
    this.userMapper = UserMapper
  }

  async getByIdentifier (identifier) {
    try {
      const user = await this.db.user.findFirst({
        where: {
          OR: [
            { username: identifier },
            { email: identifier }
          ]
        }
      })
      if (user) return this.userMapper.toDomain(user)
      else return null
    } catch (error) {
      console.log(error)
      throw new Error('DATABASE_ERROR')
    }
  }

  async createUser (dataUser) {
    try {
      const sessionDatabase = this.userMapper.toDatabase(dataUser)
      sessionDatabase.roles = { connect: { id: 1 } }
      const newUser = await this.db.user.create({
        data: sessionDatabase
      })
      return this.userMapper.toDomain(newUser)
    } catch (error) {
      console.log(error)
      throw new Error('DATABASE_ERROR')
    }
  }

  async checkUsernameExists (username) {
    try {
      const existingUser = await this.db.user.findFirst({
        where: { username }
      })
      return !!existingUser
    } catch (error) {
      console.log(error)
      throw new Error('DATABASE_ERROR')
    }
  }

  async getUserById (id) {
    try {
      const user = await this.db.user.findUnique({
        where: { id }
      })
      if (!user) return null
      return this.userMapper.toDomain(user)
    } catch (error) {
      console.log(error)
      throw new Error('DATABASE_ERROR')
    }
  }

  async getUserByUsername (username) {
    try {
      const user = await this.db.user.findFirst({
        where: { username }
      })
      if (!user) return null
      return this.userMapper.toDomain(user)
    } catch (error) {
      console.log(error)
      throw new Error('DATABASE_ERROR')
    }
  }

  async getUsers () {
    try {
      const users = await this.db.user.findMany()
      return users.map(user => this.userMapper.toDomain(user))
    } catch (error) {
      console.log(error)
      throw new Error('DATABASE_ERROR')
    }
  }
}
