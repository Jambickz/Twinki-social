const PostRepository = require('~domain/post/repository')
const PostMapper = require('./mapper')
module.exports = class PrismaPostRepository extends PostRepository {
  constructor ({ db }) {
    super()
    this.db = db
    this.postMapper = PostMapper
  }

  async createPost ({ caption, userId, senderId }) {
    try {
      const post = await this.db.post.create({
        data: {
          caption,
          userId,
          senderId
        }
      })
      if (!post) return null
      return this.postMapper.toDomain(post)
    } catch (error) {
      console.log(error)
      throw new Error('DATABASE_ERROR') 
    }
  }
}
