
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
	
	async login(req, res) {
		try {
			const {isRefreshToken = false, login, password} = req.body
			
      const user = await this.authService.loginUser(login, password)
      const sessionData = {
        userId: user.userId,
          ...req.sessionData
      }
      const session = await this.authService.createSession(sessionData)
			const maxAge = isRefreshToken
				? 30 * 24 * 60 * 60 * 1000 // Время жизни  30 дней
				: 30 * 60 * 1000 // Время жизни  30 минут
			
			const cookieName = isRefreshToken ? 'refreshToken' : 'accessToken'
			res.cookie(cookieName, isRefreshToken ? session.refreshToken : session.accessToken, {
				maxAge,
				httpOnly: true,
			})
      res.success(user, "LOGIN_SUCCESS")
    } catch (e) {
      res.error(500, 'Internal Server Error', e)
    }
	}
	
	async logout(req, res){
		try {
			const {refreshToken, accessToken} = req.cookies
			const type = refreshToken ? 'refreshToken' : 'accessToken'
			const token = refreshToken ? refreshToken : accessToken
			await this.authService.deleteSessionByToken(type, token);
			res.clearCookie(type)
			res.success(null, "LOGOUT_SUCCESS");
    } catch (e) {
      res.error(500, 'Internal Server Error', e)
    }
	}
	
	
}
