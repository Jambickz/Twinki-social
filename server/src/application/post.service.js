const APIException = require('~infrastructure/helpers/apiError')

module.exports = class AuthService {
  constructor ({ postRepository, userRepository }) {
    this.postRepository = postRepository
    this.userRepository = userRepository
  }

  async createPost ({ caption, username, senderId }) {
    const { id: userId } = await this.userRepository.getUserByUsername(username)
    const post = await this.postRepository.createPost({ caption, userId, senderId })
    if (!post) throw new APIException('ERROR_CREATE_POST')
    return post
  }
}
