const Service = require('~domain/auth/model')

module.exports = class ServiceMapper {
  static toDomain (data) {
    return new Service(data)
  }

  static toDatabase (post) {
    return {}
  }
}
