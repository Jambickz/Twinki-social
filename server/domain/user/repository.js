module.exports = class UserRepository {
	// Сохранить нового пользователя в базе данных
	// domainUser: объект domainUser (модель пользователя) для сохранения
	createUser(domainUser) {
		throw new Error('ERR_METHOD_NOT_IMPLEMENTED')
	}
	
	// Обновить существующего пользователя в базе данных
	// domainUser: объект domainUser (модель пользователя) с обновленными данными
	updateUser(domainUser) {
		throw new Error('ERR_METHOD_NOT_IMPLEMENTED')
	}
	
	// Удалить пользователя из базы данных по его идентификатору (userId)
	// userId: идентификатор пользователя, которого нужно удалить
	removeUser(userId) {
		throw new Error('ERR_METHOD_NOT_IMPLEMENTED')
	}
	
	// Получить пользователя из базы данных по его идентификатору (userId)
	// userId: идентификатор пользователя, которого нужно получить
	getUser(userId) {
		throw new Error('ERR_METHOD_NOT_IMPLEMENTED')
	}
	
	// Найти пользователей в базе данных

	getUsers() {
		throw new Error('ERR_METHOD_NOT_IMPLEMENTED')
	}
	
	// Получить пользователя из базы данных по его email, username
	getByUsername(string) {
		throw new Error('ERR_METHOD_NOT_IMPLEMENTED')
	}

	
	// Метод для подписки на пользователя
	// followerId: идентификатор пользователя, который хочет подписаться (подписчик)
	// followingId: идентификатор пользователя, на которого подписываются (пользователь, за которым следят)
	// Возвращает булево значение, показывающее успешность подписки
	followUser(followerId, followingId) {
		throw new Error('ERR_METHOD_NOT_IMPLEMENTED')
	}
	
	// Метод для отмены подписки на пользователя
	// followerId: идентификатор пользователя, который хочет отписаться (подписчик)
	// followingId: идентификатор пользователя, от которого отписываются
	// Возвращает булево значение, показывающее успешность отписки
	unfollowUser(followerId, followingId) {
		throw new Error('ERR_METHOD_NOT_IMPLEMENTED')
	}
	
	// Метод для получения списка фолловеров пользователя
	// userId: идентификатор пользователя, для которого нужно получить список фолловеров
	// Возвращает массив объектов, представляющих фолловеров пользователя
	getFollowers(userId) {
		throw new Error('ERR_METHOD_NOT_IMPLEMENTED')
	}
	
	// Метод для получения списка пользователей, на которых подписан пользователь (подписки)
	// userId: идентификатор пользователя, для которого нужно получить список подписок
	// Возвращает массив объектов, представляющих пользователей, на которых подписан пользователь
	getFollowing(userId) {
		throw new Error('ERR_METHOD_NOT_IMPLEMENTED')
	}
	
	// Метод для проверки, является ли один пользователь фолловером другого пользователя
	// followerId: идентификатор пользователя, который потенциально является фолловером
	// followingId: идентификатор пользователя, на которого проверяется фолловинг
	// Возвращает булево значение, показывающее, является ли пользователь фолловером
	isFollower(followerId, followingId) {
		throw new Error('ERR_METHOD_NOT_IMPLEMENTED')
	}
	
	// Метод для получения общего количества фолловеров и подписок пользователя
	// userId: идентификатор пользователя, для которого нужно получить количество фолловеров и подписок
	// Возвращает объект с двумя полями: followersCount - количество фолловеров, и followingCount - количество подписок
	getFollowerFollowingCount(userId) {
		throw new Error('ERR_METHOD_NOT_IMPLEMENTED')
	}
	
	// Метод для поиска пользователей по ключевому слову (например, имени или никнейму)
	// keyword: ключевое слово для поиска пользователей
	// Возвращает массив объектов, представляющих пользователей, найденных по ключевому слову
	searchUsers(keyword) {
		throw new Error('ERR_METHOD_NOT_IMPLEMENTED')
	}
	
	// Метод для обновления последнего времени активности пользователя
	// userId: идентификатор пользователя, для которого нужно обновить время активности
	// lastOnlineTime: время последней активности
	// Возвращает булево значение, показывающее успешность обновления времени активности
	updateLastOnline(userId, lastOnlineTime) {
		throw new Error('ERR_METHOD_NOT_IMPLEMENTED')
	}
}
