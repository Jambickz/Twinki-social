module.exports = class UserRepository {
  createUser (domainUser) {
    // Сохранить нового пользователя в базе данных
    // domainUser: объект domainUser (модель пользователя) для сохранения
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED')
  }

  updateUser (domainUser) {
    // Обновить существующего пользователя в базе данных
    // domainUser: объект domainUser (модель пользователя) с обновленными данными
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED')
  }

  removeUser (userId) {
    // Удалить пользователя из базы данных по его идентификатору (userId)
    // userId: идентификатор пользователя, которого нужно удалить
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED')
  }

  getUser (userId) {
    // Получить пользователя из базы данных по его идентификатору (userId)
    // userId: идентификатор пользователя, которого нужно получить
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED')
  }

  getUsers () {
    // Получить пользователей в базе данных
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED')
  }

  getByIdentifier (identifier) {
    // Получить пользователя из базы данных по его  username или email

    throw new Error('ERR_METHOD_NOT_IMPLEMENTED')
  }
}
