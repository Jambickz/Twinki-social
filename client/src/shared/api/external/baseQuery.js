import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const apiUrl = import.meta.env.VITE_API_URL

export const baseQuery = fetchBaseQuery(
  {
    baseUrl: apiUrl, // Урл
    credentials: 'include', // Разрешить куки
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('token') // Получение токена доступа
      if (token) headers.set('authorization', `Bearer ${token}`) // Установка токена доступа
      return headers
    }
  }
)
