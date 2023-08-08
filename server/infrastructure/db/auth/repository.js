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
			return await this.db.userSession.create({
				data: sessionData,
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
		console.log(user)
		return !!user
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
	
	async removeSession(sessionId) {
		try {
			await this.db.userSession.update({
				where: {
					sessionId: sessionId,
				},
				data: {
					isActive: false,
				},
			});
		} catch (error) {
			throw new Error('Failed to remove session: ' + error.message);
		}
	}
	
}
