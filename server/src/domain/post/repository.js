module.exports = class PostRepository {
  async createPost (postData) {
    // создание поста
    // возврат обьект поста
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED')
  }

  async getAllPosts (username) {
    // получение списка всех постов юзера
    // Возвращает массив всех постов из базы данных
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED')
  }

  async getPostById (postId) {
    // получениe поста по его идентификатору
    // возвращает пост с указанным идентификатором
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED')
  }

  async updatePost (postId, updatedData) {
    // обновления информации о посте
    // обновляет информацию о посте с указанным идентификатором
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED')
  }

  async deletePost (postId) {
    // удалениу поста по его идентификатору
    // удаляет пост с указанным идентификатором
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED')
  }
}
