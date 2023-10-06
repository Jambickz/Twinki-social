import $apiAxios from './config'

class Api {
  constructor (axiosInstance) {
    this.axios = axiosInstance
  }

  async get (link, params = {}) {
    try {
      const response = await this.axios.get(link, { params })
      return this.handleResponse(response.data)
    } catch (error) {
      return this.handleError(error)
    }
  }

  async post (link, body) {
    try {
      const response = await this.axios.post(link, body)
      return this.handleResponse(response.data)
    } catch (error) {
      return this.handleError(error)
    }
  }

  async put (link, body) {
    try {
      const response = await this.axios.put(link, body)
      return this.handleResponse(response.data)
    } catch (error) {
      return this.handleError(error)
    }
  }

  async delete (link, body) {
    try {
      const response = await this.axios.delete(link, { data: body })
      return this.handleResponse(response.data)
    } catch (error) {
      return this.handleError(error)
    }
  }

  handleResponse (data) {
    if (data.status) {
      return { success: true, data: data.data }
    } else {
      return { success: false, message: data.message || 'An error occurred' }
    }
  }

  handleError (error) {
    return { success: false, message: error.message || 'An error occurred' }
  }
}

export const $api = new Api($apiAxios)
