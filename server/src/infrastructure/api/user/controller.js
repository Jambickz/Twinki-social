const filterObject = require('~infrastructure/helpers/filterObject')

module.exports = class UserController {
  constructor ({ userService, authService }) {
    this.userService = userService
    this.authService = authService
  }

  async getUser (req, res, next) {
    try {
      const { param } = req.params
      let user
      if (!isNaN(param)) user = await this.userService.getUserById(+param)
      else user = await this.userService.getUserByUsername(param)
      res.success(filterObject(user, 'USER'), 'GET_USER_SUCCESS')
    } catch (error) {
      next(error)
    }
  }

  async getUsers (req, res, next) {
    try {
      const users = await this.userService.getUsers()
      res.success(users, 'GET_USERS_SUCCESS')
    } catch (error) {
      next(error)
    }
  }

  async getMe (req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const session = this.authService.refresh(refreshToken)
      const { sessionId } = session
      const user = await this.authService.getBySessionId(sessionId)
      res.success(filterObject(user, 'USER'), 'GET_ME_SUCCESS')
    } catch (error) {
      next(error)
    }
  }
}
