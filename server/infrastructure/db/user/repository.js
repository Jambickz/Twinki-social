const UserRepository = require('../../../domain/user/repository');
const UserMapper = require('./mapper');
module.exports = class PrismaUserRepository extends UserRepository {
	constructor({db}) {
		super();
		this.db = db
		this.userMapper = UserMapper
	}
	
	async createUser(domainUser) {
		try {
			domainUser.roles =  {connect: {roleId: 1}}
			const newUser = await this.db.user.create({
				data: domainUser
			});
			return this.userMapper.toDomain(newUser)
		} catch (error) {
			throw new Error('Failed to create user: ' + error.message);
		}
	}
	
	async updateUser(domainUser) {
		try {
			const updatedUser = await this.db.user.update({
				where: { userId: domainUser.userId },
				data: domainUser,
			});
			return this.userMapper.toDomain(updatedUser);
		} catch (error) {
			throw new Error('Failed to update user: ' + error.message);
		}
	}
	
	async removeUser(userId) {
		try {
			const existingUser = await this.db.user.findUnique({
				where: { userId },
			});
			
			if (existingUser && existingUser.deletedAt !== null) {
				return null
			}
			
			const deletedUser = await this.db.user.update({
				where: { userId },
				data: {
					deletedAt: new Date(),
				},
			});
			
			return this.userMapper.toDomain(deletedUser);
		} catch (error) {
			throw new Error('Failed to "delete" user: ' + error.message);
		}
	}
	
	async getUser(userId) {
		try {
			const user = await this.db.user.findUnique({
				where: { userId },
			});
			if (user) return this.userMapper.toDomain(user);
			else throw new Error('User not found');
		} catch (error) {
			throw new Error('Failed to fetch user: ' + error.message);
		}
	}
	
	async getUsers() {
		try {
			const users = await this.db.user.findMany();
			return users.map(user => this.userMapper.toDomain(user));
		} catch (error) {
			throw new Error('Failed to fetch users: ' + error.message);
		}
	}
	
	
}
