const jwt = require('jsonwebtoken')

class JwtService {
  constructor () {
    this.refreshTokenSecret = process.env.JWT_REFRESH_SECRET
  }

  generateTokens ({ sessionId }) {
    return jwt.sign({ sessionId }, this.refreshTokenSecret, { expiresIn: '31d' })
  }

  validateRefreshToken (token) {
    try {
      return jwt.verify(token, this.refreshTokenSecret).sessionId
    } catch (e) {
      return null
    }
  }
}

module.exports = JwtService
