module.exports = class AuthController {
  constructor ({ authService, userService, mailService }) {
    this.authService = authService
    this.userService = userService
    this.mailService = mailService
  }

  async login (req, res) {
    try {
      const { login, password } = req.value
      const user = await this.authService.loginUser(login, password)
      const sessionData = {
        userId: user.id,
        ...req.sessionData
      }
      const session = await this.authService.createSession(sessionData)
      res.cookie('refreshToken', session.token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }) // 30 days
      res.success(user, 'LOGIN_SUCCESS')
    } catch (error) {
      console.error(error)
      res.error(500, 'ERROR_INTERNAL_SERVER', error.message)
    }
  }

  async registration (req, res) {
    try {
      const user = await this.userService.createUser(req.value)
      const sessionData = {
        userId: user.id,
        ...req.sessionData
      }
      const session = await this.authService.createSession(sessionData)
      res.cookie('refreshToken', session.token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }) // 30 days
      res.success(user, 'REGISTRATION_SUCCESS')
    } catch (error) {
      console.error(error)
      res.error(500, 'ERROR_INTERNAL_SERVER', error.message)
    }
  }

  async logout (req, res) {
    try {
      const { refreshToken } = req.cookies
      const authAnswer = await this.authService.deleteSessionByToken(refreshToken)
      if (!authAnswer) throw new Error('Session remove failed')
      res.clearCookie(refreshToken)
      res.success(null, 'LOGOUT_SUCCESS')
    } catch (error) {
      console.error(error)
      res.error(500, 'ERROR_INTERNAL_SERVER', error.message)
    }
  }

  async sendActivationCode (req, res) {
    try {
      const { email } = req.value
      const activationCode = await this.authService.generateActivationCode(email)
      if (!activationCode) throw new Error('ERROR_CREATE_ACTIVATION_CODE_FAILED')
      await this.mailService.sendActivationCode(email, activationCode)
      res.success(activationCode, 'CREATE_SUCCESS')
    } catch (error) {
      console.error(error)
      res.error(500, 'ERROR_INTERNAL_SERVER', error.message)
    }
  }

  async checkActivationCode (req, res) {
    try {
      const { email, code } = req.value
      const aunt = await this.authService.checkActivationCode(email, code)
      if (!aunt) throw new Error('ERROR_CHECK_ACTIVATION_CODE_FAILED')
      res.success('ACTIVATION_SUCCESS')
    } catch (error) {
      console.error(error)
      res.error(500, 'ERROR_INTERNAL_SERVER', error.message)
    }
  }

  async resetPassword (req, res) {
    try {
      console.log('reset password')
    } catch (error) {
      console.error(error)
      res.error(500, 'ERROR_INTERNAL_SERVER', error.message)
    }
  }
}
