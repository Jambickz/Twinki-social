const bcrypt = require('bcrypt')
const generateUsername = require('~infrastructure/helpers/generateUsername')
module.exports = class UserService {
  constructor ({ userRepository, authRepository }) {
    this.authRepository = authRepository
    this.userRepository = userRepository
  }

  async createUser (data) {
    const { email, password, profileName } = data
    const candidate = await this.authRepository.checkUserExistence(email)
    if (candidate) throw new Error('ERROR_USER_ALREADY_EXISTS')
    const hashPassword = await bcrypt.hash(password, 3)
    const username = await generateUsername(profileName, this.userRepository)
    return await this.userRepository.createUser({ ...data, username, profileName, password: hashPassword })
  }

  async getUser (id) {
    return this.userRepository.getUser(id)
  }

  async getUsers () {
    return await this.userRepository.getUsers()
  }
}
