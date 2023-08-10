
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
			res.cookie('refreshToken', session.token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true}) // 30 days
			res.success(user, "REGISTRATION_SUCCESS")
		} catch (e) {
			res.error(500, 'Internal Server Error', e)
		}
	}
	
	async login(req, res) {
		try {
			const { login, password} = req.body
			
      const user = await this.authService.loginUser(login, password)
      const sessionData = {
        userId: user.userId,
          ...req.sessionData
      }
      const session = await this.authService.createSession(sessionData)
			
			res.cookie('refreshToken', session.token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true}) // 30 days
      res.success(user, "LOGIN_SUCCESS")
    } catch (e) {
      res.error(500, 'Internal Server Error', e)
    }
	}
	
	async logout(req, res){
		try {
			const {refreshToken} = req.cookies
			const authAnswer = await this.authService.deleteSessionByToken(refreshToken);
			if(!authAnswer) throw new Error(`Session remove failed`)
			res.clearCookie(refreshToken)
			res.success(null, "LOGOUT_SUCCESS");
    } catch (e) {
      res.error(500, 'Internal Server Error', e)
    }
	}
	
	
}
