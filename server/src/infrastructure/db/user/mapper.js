const User = require('~domain/user/model')

module.exports = class UserMapper {
  static toDomain (data) {
    return new User(data)
  }

  static toDatabase (user) {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      password: user.password,
      roles: user.roles,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
      lastOnline: user.lastOnline,
      isOffline: user.isOffline,
      profileName: user.profileName,
      profilePicture: user.profilePicture,
      profilePictureId: user.profilePictureId,
      bio: user.bio,
      verification: user.verification
    }
  }
}
