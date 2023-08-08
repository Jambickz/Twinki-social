const container = require('../DI')
const authService = container.resolve('authService')
const tokenService = container.resolve('tokenService')


module.exports = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization
		if (!authHeader) {
			return res.error(403, 'No authorization')
		}
		
		const [type, token] = authHeader.split(' ')
		
		if (type !== 'Bearer') {
			return res.error(403, 'Invalid token type')
		}
		
		const decodedId = tokenService.validateRefreshToken(token);
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
