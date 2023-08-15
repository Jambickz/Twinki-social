const { compare } = require('bcrypt')
const generateCode = require('~infrastructure/helpers/generateCode')
const generateExpiryTime = require('~infrastructure/helpers/generateExpiryTime')
module.exports = class AuthService {
  constructor ({ authRepository, tokenService, userRepository }) {
    this.authRepository = authRepository
    this.tokenService = tokenService
    this.userRepository = userRepository
  }

  async loginUser (login, password) {
    const user = await this.userRepository.getByIdentifier(login)
    if (!user) throw new Error('ERROR_LOGIN_INVALID')
    const isPassEquals = await compare(password, user.password)
    if (!isPassEquals) throw new Error('ERROR_PASS_INVALID')
    return user
  }

  async createSession (sessionData) {
    const session = await this.authRepository.createSession(sessionData)
    if (!session) throw new Error('ERROR_CREATE_SESSION')
    const token = this.tokenService.generateTokens(session.id)
    return { token, id: session.id }
  }

  // TODO: Переделать уаление сессии
  async deleteSessionByToken (token) {
    const sessionId = this.tokenService.validateRefreshToken(token)
    if (!sessionId) throw new Error('ERROR_TOKEN_BROKEN')
    return await this.authRepository.removeSession(sessionId)
  }

  async getBySessionId (sessionId) {
    const session = await this.authRepository.getBySessionId(sessionId)
    if (session) throw new Error('ERROR_FIND_SESSION')
    return session
  }

  async generateActivationCode (email) {
    const code = generateCode()
    const expiryTime = generateExpiryTime()
    const existingActivationCode = await this.authRepository.findCodeByEmail(email)
    if (existingActivationCode) await this.authRepository.updateCodeByEmail(email, code, expiryTime)
    else await this.authRepository.createCodeByEmail(email, code, expiryTime)
    return code
  }

  async checkActivationCode (email, code) {
    const verifyCode = await this.authRepository.findCode(email, code)
    if (verifyCode.activeAt === null && verifyCode.expiryTime > Date.now()) return await this.authRepository.activeCode(email, code)
    else throw new Error('ERROR_ACTIVATION_CODE_EXPIRED')
  }
}
