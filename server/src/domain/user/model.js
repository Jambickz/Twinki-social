module.exports = class UserModel {
  constructor ({
    id,
    email,
    username,
    password,

    roles,

    createdAt,
    updatedAt,
    deletedAt,

    lastOnline,
    isOffline,

    profileName,
    profilePicture,
    profilePictureId,
    bio,
    verification,

    followers,
    following,
    sessions,
    uploads
  }) {
    this.id = id
    this.email = email
    this.username = username
    this.password = password
    this.roles = roles
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.deletedAt = deletedAt
    this.lastOnline = lastOnline
    this.isOffline = isOffline
    this.profileName = profileName
    this.profilePicture = profilePicture
    this.profilePictureId = profilePictureId
    this.bio = bio
    this.verification = verification
    this.followers = followers
    this.following = following
    this.sessions = sessions
    this.uploads = uploads
  }
}
