const User = require('../domain/user/model')
const bcrypt = require('bcrypt')
const uuid = require('uuid')

module.exports = class UserService {
	constructor({ userRepository, authRepository}) {
		this.authRepository = authRepository
		this.userRepository = userRepository
	}
	async createUser(data) {
		try {
			const { email, password, username} = data
			const candidate = await this.authRepository.checkUserExistence(email, username)
			if(candidate)	throw new Error('A user with this email or username already exists' )
			const hashPassword = await bcrypt.hash(password, 3)
			return await this.userRepository.createUser({...data , password: hashPassword})
		} catch (e) {
			throw  new Error('Failed to create user:' + e.message)
		}
	}
	
	async updateUser(data) {
		try {
			return await this.userRepository.updateUser(data)
		} catch (e) {
			throw  new Error('Failed to update user: ' + e.message)
		}
	}
	
	async removeUser(userId) {
		try {
			return this.userRepository.removeUser(userId)
		} catch (e) {
			throw  new Error('Failed to delete user: ' + e.message)
		}
	}
	
	async getUser(userId) {
		try {
			return this.userRepository.getUser(userId);
		} catch (e) {
			throw  new Error('Failed to get user middle: '+ e.message)
		}
	}
	
	
	async getUsers() {
		try {
			return await this.userRepository.getUsers()
		} catch (e) {
			throw  new Error('Failed to get users: ' + e.message)
		}
	}
	

}