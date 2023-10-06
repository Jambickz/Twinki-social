const jwt = require('jsonwebtoken')

class JwtService {
  constructor () {
    this.refreshTokenSecret = process.env.JWT_REFRESH_SECRET
    this.accessTokenSecret = process.env.JWT_ACCESS_SECRET
  }

  generateTokens (id) {
    const accessToken = jwt.sign({ id }, this.accessTokenSecret, { expiresIn: '15min' })
    const refreshToken = jwt.sign({ id }, this.refreshTokenSecret, { expiresIn: '31d' })
    return {
      accessToken,
      refreshToken
    }
  }

  validateAccessToken (token) {
    try {
      return jwt.verify(token, this.accessTokenSecret).id
    } catch (e) {
      return null
    }
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
