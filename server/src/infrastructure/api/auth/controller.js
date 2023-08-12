module.exports = class AuthController {
  constructor ({ authService, userService, mailService }) {
    this.authService = authService
    this.userService = userService
    this.mailService = mailService
  }

  async registration (req, res) {
    try {
      const user = await this.userService.createUser(req.body)
      const sessionData = {
        userId: user.userId,
        ...req.sessionData
      }
      const session = await this.authService.createSession(sessionData)
      res.cookie('refreshToken', session.token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }) // 30 days
      res.success(user, 'REGISTRATION_SUCCESS')
    } catch (e) {
      res.error(500, 'Internal Server Error', e)
    }
  }

  async login (req, res) {
    try {
      const { login, password } = req.body

      const user = await this.authService.loginUser(login, password)
      const sessionData = {
        userId: user.userId,
        ...req.sessionData
      }
      const session = await this.authService.createSession(sessionData)

      res.cookie('refreshToken', session.token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }) // 30 days
      res.success(user, 'LOGIN_SUCCESS')
    } catch (e) {
      res.error(500, 'Internal Server Error', e)
    }
  }

  async logout (req, res) {
    try {
      const { refreshToken } = req.cookies
      const authAnswer = await this.authService.deleteSessionByToken(refreshToken)
      if (!authAnswer) throw new Error('Session remove failed')
      res.clearCookie(refreshToken)
      res.success(null, 'LOGOUT_SUCCESS')
    } catch (e) {
      res.error(500, 'Internal Server Error', e)
    }
  }

  async sendActivationCode (req, res) {
    try {
      const { email } = req.body
      const activationCode = await this.authService.generateActivationCode(email)
      if (!activationCode) throw new Error('create activation code failed')
      await this.mailService.sendActivationCode(email, activationCode)
      res.success(activationCode, 'CREATE_SUCCESS')
    } catch (e) {
      res.error(500, 'Internal Server Error', e)
    }
  }

  async checkActivationCode (req, res) {
    try {
      const { email, activationCode } = req.body
      const aunt = await this.authService.checkActivationCode(email, activationCode)
      if (!aunt) throw new Error('check activation code failed')
      res.success('ACTIVATION_SUCCESS')
    } catch (e) {
      res.error(500, 'Internal Server Error', e)
    }
  }
}
