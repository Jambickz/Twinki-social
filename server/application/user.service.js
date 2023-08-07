const User = require('../domain/user/model')
module.exports = class UserService {
	constructor({ userRepository }) {
		this.userRepository = userRepository
	}
	async createUser(data) {
		data.activationKey = "gaysexxxxx23"
		const user = new User(data)
		return await this.userRepository.createUser(user)
	}
	
	async updateUser(data) {
		try {
			const updatedUser = new User(data)
			return await this.userRepository.updateUser(updatedUser)
		} catch (error) {
			throw new Error('Failed to update user: ' + error.message)
		}
	}
	
	async removeUser(userId) {
		try {
			return this.userRepository.removeUser(userId)
		} catch (error) {
			throw new Error('Failed to delete user: ' + error.message)
		}
	}
	
	async getUser(userId) {
		return this.userRepository.getUser(userId);
	}
	
	
	async getUsers() {
		return await this.userRepository.getUsers()
	}
	

}