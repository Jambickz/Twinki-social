import axios from 'axios'
export const API_URL = import.meta.env.VITE_API_URL

export const $apiAxios = axios.create({
  baseURL: API_URL, // Урл
  withCredentials: true // Разрешить куки
})
$apiAxios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

// если я получаю ошибку на сервере 401, то пробуем обновить токен
$apiAxios.interceptors.response.use((config) => {
  return config
}, async (error) => {
  const originalRequest = error.config
  if (error.response.status === 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true
    try {
      const response = await axios.get(`${API_URL}auth/refresh`, { withCredentials: true })
      localStorage.setItem('token', response.data.data.accessToken)
      return $apiAxios.request(originalRequest)
    } catch (e) {
      console.log('НЕ АВТОРИЗОВАН')
    }
  }
  throw error
})

export default $apiAxios
