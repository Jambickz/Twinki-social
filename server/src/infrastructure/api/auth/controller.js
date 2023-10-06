module.exports = class AuthController {
  constructor ({ authService, userService, mailService }) {
    this.authService = authService
    this.userService = userService
    this.mailService = mailService
  }

  async login (req, res, next) {
    try {
      const { login, password } = req.value
      const user = await this.authService.loginUser(login, password)
      const sessionData = {
        userId: user.id,
        ...req.sessionData
      }
      const session = await this.authService.createSession(sessionData)
      const { tokens } = session
      res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }) // 30 days
      res.success({ user, accessToken: tokens.accessToken }, 'LOGIN_SUCCESS')
    } catch (error) {
      next(error)
    }
  }

  async registration (req, res, next) {
    try {
      const user = await this.userService.createUser(req.value)
      const sessionData = {
        userId: user.id,
        ...req.sessionData
      }
      const session = await this.authService.createSession(sessionData)
      const { tokens } = session
      res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }) // 30 days
      res.success({ user, accessToken: tokens.accessToken }, 'REGISTRATION_SUCCESS')
    } catch (error) {
      next(error)
    }
  }

  async logout (req, res, next) {
    try {
      const { refreshToken } = req.cookies
      console.log('logout')
      const authAnswer = await this.authService.deleteSessionByToken(refreshToken)
      if (!authAnswer) throw new Error('Session remove failed')
      res.clearCookie(refreshToken)
      res.success(null, 'LOGOUT_SUCCESS')
    } catch (error) {
      next(error)
    }
  }

  async refresh (req, res, next) {
    try {
      const { refreshToken } = req.cookies
      if (!refreshToken) return res.status(401).send('ERROR_NO_AUTHORIZATION')
      const session = this.authService.refresh(refreshToken)
      const { tokens, sessionId } = session
      const user = await this.authService.getBySessionId(sessionId)
      res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }) // 30 days
      res.success({ accessToken: tokens.accessToken, user }, 'REFRESH_SUCCESS')
    } catch (error) {
      next(error)
    }
  }

  async connect (req, res, next) {
    try {
      const { refreshToken } = req.cookies
      if (!refreshToken) return res.status(401).send('ERROR_NO_AUTHORIZATION')
      const sessionId = this.authService.connect(refreshToken)
      const user = await this.authService.getBySessionId(sessionId)
      res.success({ user }, 'CONNECT_SUCCESS')
    } catch (error) {
      next(error)
    }
  }

  async sendActivationCode (req, res, next) {
    try {
      const { email } = req.value
      const activationCode = await this.authService.generateActivationCode(email)
      if (!activationCode) throw new Error('ERROR_CREATE_ACTIVATION_CODE_FAILED')
      await this.mailService.sendActivationCode(email, activationCode)
      res.success(activationCode, 'CREATE_SUCCESS')
    } catch (error) {
      next(error)
    }
  }

  async checkActivationCode (req, res, next) {
    try {
      const { email, code } = req.value
      const aunt = await this.authService.checkActivationCode(email, code)
      if (!aunt) throw new Error('ERROR_CHECK_ACTIVATION_CODE_FAILED')
      res.success('ACTIVATION_SUCCESS')
    } catch (error) {
      next(error)
    }
  }

  async resetPassword (req, res, next) {
    try {
      console.log('reset password')
    } catch (error) {
      next(error)
    }
  }
}
