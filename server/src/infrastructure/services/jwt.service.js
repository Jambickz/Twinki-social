const jwt = require('jsonwebtoken')

class JwtService {
  constructor () {
    this.refreshTokenSecret = process.env.JWT_REFRESH_SECRET
  }

  generateTokens (id) {
    return jwt.sign({ id }, this.refreshTokenSecret, { expiresIn: '31d' })
  }

  validateRefreshToken (token) {
    try {
      return jwt.verify(token, this.refreshTokenSecret).id
    } catch (e) {
      return null
    }
  }
}

module.exports = JwtService
