module.exports = class PostModel {
  constructor ({
    id,
    userId,
    senderId,

    caption,

    uploads,
    uploadCount,

    deletedAt,
    createdAt,
    updatedAt
  }) {
    this.id = id
    this.userId = userId
    this.senderId = senderId

    this.caption = caption
    this.uploads = uploads
    this.uploadCount = uploadCount

    this.deletedAt = deletedAt
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
