module.exports = class UserController {
  constructor ({ userService }) {
    this.userService = userService
  }

  async getUser (req, res, next) {
    try {
      let users
      const { id } = req.params
      if (id) users = await this.userService.getUser(+id)
      else users = await this.userService.getUsers()
      res.success(users, 'GET_USER_SUCCESS')
    } catch (error) {
      console.error(error)
      res.error(500, 'ERROR_INTERNAL_SERVER', error.message)
    }
  }
}
