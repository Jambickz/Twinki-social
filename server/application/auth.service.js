const bcrypt = require("bcrypt");

module.exports = class AuthService {
	constructor({ authRepository, tokenService, userRepository }) {
		this.authRepository = authRepository
		this.tokenService = tokenService
		this.userRepository = userRepository
	}
	async createSession(sessionData) {
		try {
			const session = await this.authRepository.createSession(sessionData)
			const tokens =  this.tokenService.generateTokens(session)
			return{...tokens, sessionId:session.sessionId}
		} catch (e) {
			throw new Error('Failed to create session: ' + e.message)
		}
	}
	
	async loginUser (login, password){
		try {
			const user = await this.userRepository.getByUsernameOrEmail(login)
			if(!user) throw  Error('ERROR_LOGIN_NULL')
			const isPassEquals = await bcrypt.compare(password, user.password)
			if(!isPassEquals) throw Error('ERROR_PASS_INVALID')
			return user
		}catch (e) {
			throw new Error('Login service error'+ e.message)
		}
	}
	
	//TODO: Переделать уаление сессии
	async deleteSessionByToken(type, token){
		try {
			let sessionId;
			if (type === 'refreshToken') {
				sessionId = this.tokenService.validateRefreshToken(token);
			} else if (type === 'accessToken') {
				sessionId = this.tokenService.validateAccessToken(token);
			}
			if (!sessionId) {
				throw new Error('Invalid token');
			}
			await this.authRepository.removeSession(sessionId);
		} catch (e) {
			throw new Error('Failed to delete session: ' + e.message);
		}
	}
	
	async getBySessionId(sessionId) {
		try {
			return  await this.authRepository.getBySessionId(sessionId)
		}catch (e) {
			throw new Error('Failed to find session: ' + e.message)
		}
	}

	
}