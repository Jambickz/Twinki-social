import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiUrl } from './config'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }), // Используйте apiUrl здесь
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => 'users'
    }),
    getUser: builder.query({
      query: (userId) => `user/${userId}`
    }),
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: 'auth/registration',
        method: 'POST',
        body: newUser
      })
    }),
    loginUser: builder.mutation({
      query: (newUser) => ({
        url: 'auth/login',
        method: 'POST',
        body: newUser
      })
    }),
    logoutUser: builder.mutation({
      query: (newUser) => ({
        url: 'auth/logout',
        method: 'POST',
        body: newUser
      })
    }),
    createCodeUser: builder.mutation({
      query: (newUser) => ({
        url: 'auth/create-code',
        method: 'POST',
        body: newUser
      })
    }),
    checkCodeUser: builder.mutation({
      query: (newUser) => ({
        url: 'auth/check-code',
        method: 'POST',
        body: newUser
      })
    })
  })
})
