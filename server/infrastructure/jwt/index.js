const jwt = require('jsonwebtoken');

class JwtService {
	constructor() {
		this.accessTokenSecret = process.env.JWT_ACCESS_SECRET;
		this.refreshTokenSecret = process.env.JWT_REFRESH_SECRET;
	}
	
	generateTokens({ sessionId }) {
		const accessToken = jwt.sign({ sessionId }, this.accessTokenSecret, { expiresIn: '30m' });
		const refreshToken = jwt.sign({ sessionId }, this.refreshTokenSecret, { expiresIn: '30d' });
		return { accessToken, refreshToken };
	}
	
	validateAccessToken(token) {
		try {
			return jwt.verify(token, this.accessTokenSecret).sessionId
		} catch (e) {
			return null;
		}
	}
	
	validateRefreshToken(token) {
		try {
			return jwt.verify(token, this.refreshTokenSecret).sessionId
		} catch (e) {
			return null;
		}
	}
}

module.exports = JwtService;
