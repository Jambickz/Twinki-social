module.exports = class AuthRepository {
	async createSession(sessionData) {
		throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
	}
	
	async registration(user) {
		throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
	}
	
	async removeSessionByToken(sessionId) {
		throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
	}
	
	async getUserSessions(userId) {
		throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
	}
	
	async getSessionById(sessionId) {
		throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
	}
	
	async updateSession(sessionId, updates) {
		throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
	}
};