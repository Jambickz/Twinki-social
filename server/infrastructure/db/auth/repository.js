const AuthRepository = require("../../../domain/auth/repository");
const AuthMapper = require("./mapper");
module.exports = class PrismaAuthRepository extends AuthRepository {
	constructor({db}) {
		super();
		this.db = db
		this.authMapper = AuthMapper
		
	}
	async createSession(sessionData) {
		try {
			const domainService = this.authMapper.toDomain(sessionData);
			return await this.db.userSession.create({
				data: domainService,
			});
		} catch (e) {
			throw new Error('Failed to create session:', e.message);
		}
	}
	
	async checkUserExistence(email, username) {
		const user = await this.db.user.findFirst({
			where: {
				OR: [
					{ email: email },
					{ username: username },
				],
			},
		})
		return !!user
	}
	
	
	
	async removeSession(sessionId) {
		try {
			const result =  this.db.userSession.update({
				where: {
					sessionId: sessionId,
				},
				data: {
					isActive: false,
				},
			});
			return !!result
		} catch (error) {
			throw new Error('Failed to remove session: ' + error.message);
		}
	}
	
	async getBySessionId(sessionId) {
		try {
			return await this.db.user.findFirst({
				where: {
					sessions: {
						some: {
							AND: [
								{ sessionId: sessionId },
								{ isActive: true },
							],
						},
					},
				},
			});
		} catch (e) {
			throw new Error('Failed to find user by session: ' + e.message);
		}
	}
	
}
