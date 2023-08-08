module.exports = class UserController {
	constructor({userService}) {
		this.userService = userService
	}
	
	async createUser(req, res, next) {
		try {
			const user = await this.userService.createUser(req.body)
			res.success(user)
		} catch (e) {
			res.error(500, 'Internal Server Error', e)
		}
	}
	
	async updateUser(req, res, next) {
		try {
			const {id} = req.params
			req.body.userId = +id
			const updatedUser = await this.userService.updateUser(req.body)
			res.success(updatedUser)
		} catch (e) {
			res.error(500, 'Internal Server Error', e)
		}
	}
	
	async removeUser(req, res, next) {
		try {
			const {id} = req.params
			const isDeleted = await this.userService.removeUser(+id)
			if (isDeleted) res.success(isDeleted, 'User deleted successfully')
			else res.error(404, null, 'User not found')
		} catch (e) {
			res.error(500, 'Internal Server Error', e)
		}
	}
	
	async getUser(req, res, next) {
		try {
			let users
			const {id} = req.params
			if (id) users = await this.userService.getUser(+id)
			else users = await this.userService.getUsers()
			res.success(users)
		} catch (e) {
			res.error(500, 'Internal Server Error', e)
		}
	}
	
}

