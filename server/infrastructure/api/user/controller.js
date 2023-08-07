module.exports = class UserController {
	constructor({ userService }) {
		this.userService = userService
	}
	
	async createUser(req, res) {
		try {
			const user = await this.userService.createUser(req.body)
			res.success(user)
		} catch (err) {
			console.error('Error while creating user:', err)
			res.error(500, null, 'Internal Server Error')
		}
	}
	
	async updateUser(req, res) {
		try {
			const { id } = req.params
			req.body.userId = +id
			const updatedUser = await this.userService.updateUser(req.body)
			res.success(updatedUser)
		} catch (err) {
			console.error('Error while updating user:', err)
			res.error(500, null, 'Internal Server Error')
		}
	}
	
	async removeUser(req, res) {
		try {
			const { id } = req.params
			const isDeleted = await this.userService.removeUser(+id)
			if (isDeleted) res.success(isDeleted, 'User deleted successfully')
			else res.error(404, null, 'User not found')
		} catch (err) {
			console.error('Error while deleting user:', err)
			res.error(500, null, 'Internal Server Error')
		}
	}
	
	async getUser(req, res) {
		try {
			let users
			const { id } = req.params
			if (id) users = await this.userService.getUser(+id)
			else users = await this.userService.getUsers()
			res.success(users)
		} catch (err) {
			console.error('Error while fetching users:', err)
			res.error(500, null, 'Internal Server Error')
		}
	}
	

}

