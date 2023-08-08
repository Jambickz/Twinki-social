
module.exports = class AuthController {
	constructor({ authService, userService }) {
		this.authService = authService
		this.userService = userService
		
	}
	
	async registration(req, res) {
		try {
			const user = await this.userService.createUser(req.body)
			const sessionData = {
				userId: user.userId,
					...req.sessionData
			}
			const session = await this.authService.createSession(sessionData)
			res.cookie('refreshToken', session.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
			res.success(user, "REGISTRATION_SUCCESS")
		} catch (e) {
			res.error(500, 'Internal Server Error', e)
		}
	}
	
	
	
	
}
