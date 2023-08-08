const JwtService = require('../jwt/index')
const container = require('../DI')
module.exports = async (req, res, next) =>{
	try {
		const authService = container.resolve("authService")
		const jwtService = new JwtService()
		const authHeader = req.headers.authorization;
		console.log(authHeader)
		if (!authHeader) {
			res.error(403, 'No authorization')
		}
		const [type, token] = authHeader.split(' ')
		if (type !== 'Bearer') {
			res.error(403, 'Invalid token type')
		}
		const decodedId = jwtService.validateRefreshToken(token)
		const user = await authService.getBySessionId(decodedId)
		console.log(user)
		req.user = user
		next()
	} catch (e) {
		res.error(403, 'Token broken', e)
	}
}