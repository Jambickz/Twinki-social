const PostModel = require('~domain/post/model')

module.exports = class PostMapper {
  static toDomain (data) {
    return new PostModel(data)
  }

  static toDatabase (post) {
    return {}
  }
}
