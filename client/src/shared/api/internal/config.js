import axios from 'axios'

export const internalInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL  ,
  withCredentials: true
})