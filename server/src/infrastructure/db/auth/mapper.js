const Service = require('~domain/auth/model')

module.exports = class ServiceMapper {
  static toDomain (data) {
    return new Service(data)
  }

  static toDatabase (userSession) {
    return {
      id: userSession.id,
      userId: userSession.userId,
      isActive: userSession.isActive,
      ip: userSession.ip,
      browser: userSession.browser,
      os: userSession.os,
      device: userSession.device,
      createdAt: userSession.createdAt,
      updatedAt: userSession.updatedAt
    }
  }
}
