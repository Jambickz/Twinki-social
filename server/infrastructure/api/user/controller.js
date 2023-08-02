const {create} = require('../../../application/user.service');

module.exports = {
	async createUser(request) {
		
		
		const {firstName, lastName, email, password} = request.payload;
		
		const user = await create(firstName, lastName, email, password, serviceLocator);

		return serviceLocator.userSerializer.serialize(user);
	},
}