const bcrypt = require('bcrypt')
const generateUsername = require('~infrastructure/helpers/generateUsername')
const APIException = require('~infrastructure/helpers/apiError')

module.exports = class UserService {
  constructor ({ userRepository, authRepository }) {
    this.authRepository = authRepository
    this.userRepository = userRepository
  }

  async createUser (data) {
    const { email, password, profileName } = data
    const candidate = await this.authRepository.checkUserExistence(email)
    if (candidate) throw new APIException('ERROR_USER_ALREADY_EXISTS')
    const hashPassword = await bcrypt.hash(password, 3)
    const username = await generateUsername(profileName, this.userRepository)
    return await this.userRepository.createUser({ ...data, username, profileName, password: hashPassword })
  }

  async getUserById (id) {
    const user = await this.userRepository.getUserById(id)
    if (!user) throw new APIException('USER_NOT_FOUND')
    return user
  }

  async getUserByUsername (username) {
    const user = await this.userRepository.getUserByUsername(username)
    if (!user) throw new APIException('USER_NOT_FOUND')
    return user
  }

  async getUsers () {
    return await this.userRepository.getUsers()
  }
}
