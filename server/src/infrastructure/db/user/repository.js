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
    } catch (e) {
      throw new Error(e.message)
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
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async checkUsernameExists (username) {
    try {
      const existingUser = await this.db.user.findFirst({
        where: { username }
      })
      return !!existingUser
    } catch (e) {
      throw new Error(e.message)
    }
  }
}
