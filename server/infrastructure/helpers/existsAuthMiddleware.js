const JwtService = require('../jwt/index')
const container = require('../DI')
const authService = container.resolve('authService')
const jwtService = new JwtService()

module.exports = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization
		
		if (!authHeader) {
			return res.error(403, 'No authorization')
		}
		
		const [type, token] = authHeader.split(' ')
		
		if (type !== 'Bearer' && type !== 'Refresh') {
			return res.error(403, 'Invalid token type')
		}
		const decodedId = type === 'Bearer' ? jwtService.validateAccessToken(token) : jwtService.validateRefreshToken(token);
		console.log(decodedId)
		if (!decodedId) {
			return res.error(403, 'Token broken')
		}
		
		req.user = await authService.getBySessionId(decodedId)
		next()
	} catch (e) {
		return res.error(403, 'AuthMiddleware broken', e)
	}
};
