
const User = require('../domain/user/index');
class UserService {
	async create(firstName, lastName, email, password, { userRepository }){
		const user = new User(null, firstName, lastName, email, password);
		return userRepository.persist(user);
	}
}
module.exports = UserService;