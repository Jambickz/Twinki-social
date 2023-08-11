import { internalInstance } from './config'

export const client = {
  get: (url, config) => internalInstance.get(url, config),
  post: (url, data, config) => internalInstance.post(url, data, config),
  put: (url, data, config) => internalInstance.put(url, data, config),
  delete: (url, config) => internalInstance.delete(url, config),
  getUser: (userId, options) => internalInstance.get(`/user/${userId}`, options),
  getUsers: (options) => internalInstance.get(`/user`, options),
  createUser: (data, options) => internalInstance.post('/user/create', data, options),
  updateUser: (userId, data, options) => internalInstance.put(`/user/${userId}`, data, options),
  deleteUser: (userId, options) => internalInstance.delete(`/user/${userId}`, options),
  logout: (options) => internalInstance.post('/logout', null, options)
}
