import { internalInstance } from './config'

export const client = {
  get: (url, config) => internalInstance.get(url, config),
  post: (url, data, config) => internalInstance.post(url, data, config),
  put: (url, data, config) => internalInstance.put(url, data, config),
  delete: (url, config) => internalInstance.delete(url, config),
  getUser: (id, options) => internalInstance.get(`/user/${id}`, options),
  getUsers: (options) => internalInstance.get(`/user`, options),
  createUser: (data, options) => internalInstance.post('/user/create', data, options),
  updateUser: (id, data, options) => internalInstance.put(`/user/${id}`, data, options),
  deleteUser: (id, options) => internalInstance.delete(`/user/${id}`, options),
  logout: (options) => internalInstance.post('/logout', null, options)
}
