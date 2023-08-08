const Session = require("../domain/auth/model")

module.exports = class AuthService {
	constructor({ authRepository, tokenService }) {
		this.authRepository = authRepository
		this.tokenService = tokenService
	}
	async createSession(sessionData) {
		try {
			const sessionDto = new Session(sessionData)
			const session = await this.authRepository.createSession(sessionDto)
			const tokens =  this.tokenService.generateTokens(session)
			return{...tokens, sessionId:session.sessionId}
		} catch (e) {
			throw new Error('Failed to create session: ' + e.message)
		}
	}
	
	async removeSessionByToken(sessionId) {
		throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
	}
	
	async getBySessionId(sessionId) {
		try {
			return  await this.authRepository.getBySessionId(sessionId)
		}catch (e) {
			throw new Error('Failed to find session: ' + e.message)
		}
	}
	
	async getSessionById(sessionId) {
	
	}
	
	async updateSession(sessionId, updates) {
		throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
	}
	
	
}