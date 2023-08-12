const AuthRepository = require('~domain/auth/repository')
const AuthMapper = require('./mapper')
module.exports = class PrismaAuthRepository extends AuthRepository {
  constructor ({ db }) {
    super()
    this.db = db
    this.authMapper = AuthMapper
  }

  async createSession (sessionData) {
    try {
      const domainService = this.authMapper.toDomain(sessionData)
      return await this.db.userSession.create({
        data: domainService
      })
    } catch (e) {
      throw new Error('Failed to create session:', e.message)
    }
  }

  async checkUserExistence (email, username) {
    const user = await this.db.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    })
    return !!user
  }

  async removeSession (sessionId) {
    try {
      const result = await this.db.userSession.update({
        where: {
          sessionId
        },
        data: {
          isActive: false
        }
      })
      return !!result
    } catch (error) {
      throw new Error('Failed to remove session: ' + error.message)
    }
  }

  async getBySessionId (sessionId) {
    try {
      return await this.db.user.findFirst({
        where: {
          sessions: {
            some: {
              AND: [
                { sessionId },
                { isActive: true }
              ]
            }
          }
        }
      })
    } catch (e) {
      throw new Error('Failed to find user by session: ' + e.message)
    }
  }

  async findCodeByEmail (email) {
    return await this.db.activationCode.findFirst({
      where: {
        email
      }
    })
  }

  async updateCodeByEmail (email, code, expiryTime) {
    try {
      const updatedCode = await this.db.activationCode.update({
        where: { email },
        data: { activationCode: code, expiryTime }
      })
      return !!updatedCode
    } catch (error) {
      console.error('Error updating activation code:', error)
      throw new Error('Failed to update activation code')
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
      return createdCode.activationCode
    } catch (error) {
      console.error('Error creating activation code:', error)
      throw new Error('Failed to create activation code')
    }
  }

  async findCode (email, activationCode) {
    try {
      return await this.db.activationCode.findFirst({
        where: {
          email,
          activationCode
        }
      })
    } catch (error) {
      console.error('Error finding activation code::', error)
      throw new Error('Failed to finding activation code')
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
      console.error('Error finding activation code::', error)
      throw new Error('Failed to finding activation code')
    }
  }
}
