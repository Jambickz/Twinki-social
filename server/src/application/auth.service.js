const bcrypt = require('bcrypt')
const generateCode = require('~infrastructure/helpers/generateCode')
const generateExpiryTime = require('~infrastructure/helpers/generateExpiryTime')

module.exports = class AuthService {
  constructor ({ authRepository, tokenService, userRepository }) {
    this.authRepository = authRepository
    this.tokenService = tokenService
    this.userRepository = userRepository
  }
	
  async createSession (sessionData) {
    try {
      const session = await this.authRepository.createSession(sessionData)
      const token = this.tokenService.generateTokens(session)
      return { token, sessionId: session.sessionId }
    } catch (e) {
      throw new Error('Failed to create session: ' + e.message)
    }
  }

  async loginUser (login, password) {
    try {
      const user = await this.userRepository.getByUsernameOrEmail(login)
      if (!user) throw Error('ERROR_LOGIN_NULL')
      const isPassEquals = await bcrypt.compare(password, user.password)
      if (!isPassEquals) throw Error('ERROR_PASS_INVALID')
      return user
    } catch (e) {
      throw new Error('Login service error' + e.message)
    }
  }
	
  // TODO: Переделать уаление сессии
  async deleteSessionByToken (token) {
    try {
      const sessionId = this.tokenService.validateRefreshToken(token)
      if (!sessionId) throw new Error('Invalid token')
      console.log(sessionId)
      return await this.authRepository.removeSession(sessionId)
    } catch (e) {
      throw new Error('Failed to delete session: ' + e.message)
    }
  }
	
  async getBySessionId (sessionId) {
    try {
      return await this.authRepository.getBySessionId(sessionId)
    } catch (e) {
      throw new Error('Failed to find session: ' + e.message)
    }
  }

  async generateActivationCode (email) {
    try {
      const code = generateCode()
      const expiryTime = generateExpiryTime()
      const existingActivationCode = await this.authRepository.findCodeByEmail(email)
      if (existingActivationCode) await this.authRepository.updateCodeByEmail(email, code, expiryTime)
      else await this.authRepository.createCodeByEmail(email, code, expiryTime)
      return code
    } catch (e) {
      throw new Error('Login service error' + e.message)
    }
  }

  async checkActivationCode (email, code) {
    try {
      const verifyCode = await this.authRepository.findCode(email, code)
      if (verifyCode.activeAt === null && verifyCode.expiryTime > Date.now()) return await this.authRepository.activeCode(email, code)
      else throw new Error('Activation code expired')
    } catch (e) {
      throw new Error('Login service error' + e.message)
    }
  }
}
