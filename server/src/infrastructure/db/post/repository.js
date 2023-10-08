const AuthRepository = require('~domain/post/repository')
const AuthMapper = require('./mapper')
module.exports = class PrismaAuthRepository extends AuthRepository {
  constructor ({ db }) {
    super()
    this.db = db
    this.authMapper = AuthMapper
  }

  async createSession (sessionData) {
    try {
      const sessionDatabase = this.authMapper.toDatabase(sessionData)
      const session = await this.db.userSession.create({
        data: sessionDatabase
      })
      if (session) return this.authMapper.toDomain(session)
      else return null
    } catch (error) {
      console.log(error)
      throw new Error('DATABASE_ERROR') 
    }
  }

  async checkUserExistence (email) {
    try {
      const user = await this.db.user.findFirst({
        where: { email }
      })
      return !!user
    } catch (error) {
      console.log(error)
      throw new Error('DATABASE_ERROR') 
    }
  }

  async removeSession (sessionId) {
    try {
      const result = await this.db.userSession.update({
        where: {
          id: sessionId
        },
        data: {
          isActive: false
        }
      })
      return !!result
    } catch (error) {
      console.log(error)
      throw new Error('DATABASE_ERROR') 
    }
  }

  async findCodeByEmail (email) {
    try {
      const code = await this.db.activationCode.findFirst({
        where: {
          email
        }
      })
      return !!code
    } catch (error) {
      console.log(error)
      throw new Error('DATABASE_ERROR') 
    }
  }

  async updateCodeByEmail (email, code, expiryTime) {
    try {
      const updatedCode = await this.db.activationCode.update({
        where: { email },
        data: { activationCode: code, expiryTime }
      })
      return !!updatedCode
    } catch (error) {
      console.log(error)
      throw new Error('DATABASE_ERROR') 
    }
  }

  async createCodeByEmail (email, code, expiryTime) {
    try {
      const createdCode = await this.db.activationCode.create({
        data: {
          email,
          activationCode: code,
          expiryTime
        }
      })
      return createdCode.activationCode || null
    } catch (error) {
      console.log(error)
      throw new Error('DATABASE_ERROR') 
    }
  }

  async getBySessionId (sessionId) {
    try {
      const session = await this.db.user.findFirst({
        where: {
          sessions: {
            some: {
              AND: [
                { id: sessionId },
                { isActive: true }
              ]
            }
          }
        }
      })
      return session || null
    } catch (error) {
      console.log(error)
      throw new Error('DATABASE_ERROR')
    }
  }

  async findCode (email, activationCode) {
    try {
      const code = await this.db.activationCode.findFirst({
        where: {
          email,
          activationCode
        }
      })
      return code || null
    } catch (error) {
      console.log(error)
      throw new Error('DATABASE_ERROR')
    }
  }

  async activeCode (email, activationCode) {
    try {
      const updatedCode = await this.db.activationCode.update({
        where: { email, activationCode },
        data: { activeAt: new Date() }
      })
      return !!updatedCode
    } catch (error) {
      console.log(error)
      throw new Error('DATABASE_ERROR')
    }
  }
}
