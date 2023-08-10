const User = require("../../../domain/user/model");


module.exports = class UserMapper {

	static toDomain(data) {
		return new User(data);
	}
	
	static toData(domainModel) {
		return {
			user_id: domainModel.userId,
			email: domainModel.email,
			username: domainModel.username,
			password: domainModel.password,
			activation_key: domainModel.activationKey,
			created_at: domainModel.createdAt,
			updated_at: domainModel.updatedAt,
			deleted_at: domainModel.deletedAt,
			last_online: domainModel.lastOnline,
			is_offline: domainModel.isOffline,
			profile_name: domainModel.profileName,
			profile_picture_id: domainModel.profilePictureId,
			bio: domainModel.bio,
			verification: domainModel.verification,
			// roles: domainModel?.roles.map(role => ({
			// 	role_id: role.roleId,
			// 	role_name: role.roleName
			// })),
		
		};
	}
}
