module.exports = class AuthRepository {
  async createSession (sessionData) {
    // создание сессии
    // возврат обьект сессии
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED')
  }

  async checkUserExistence (email, username) {
    // проверка на существование юзера с почтой или username
    // возврат boolean
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED')
  }

  async getBySessionId (sessionId) {
    // получение юзера по сессии ид, если сессия активно
    // то вернет юзера, если нет то null

    throw new Error('ERR_METHOD_NOT_IMPLEMENTED')
  }

  async removeSession (userId) {
    // отключение сессии
    // вернет boolean

    throw new Error('ERR_METHOD_NOT_IMPLEMENTED')
  }

  async findCodeByEmail (email) {
    // поиск кода по email
    // вернет обьект

  }

  async updateCodeByEmail (email, code, expiryTime) {
    // обновление кода
    // вернет boolean

  }

  async createCodeByEmail (email, code, expiryTime) {
    // создание кода по email
    // вернет код

  }
}
