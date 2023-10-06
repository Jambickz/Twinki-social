import { createAsyncThunk } from '@reduxjs/toolkit'
import { setUser, clearSessionData } from '~entities/session/model/index.js'

export const updateToken = createAsyncThunk(
  'user/updateToken',
  async ({ status, data }, { dispatch, getState }) => {
    // eslint-disable-next-line no-useless-catch
    try {
      if (!status) {
        localStorage.clear('token')
        clearSessionData()
        return null
      }
      localStorage.setItem('token', data.accessToken)
      dispatch(setUser(data))
    } catch (error) {
      throw error
    }
  }
)




















// export const updateToken = createAsyncThunk('user/logout', async (_, { dispatch, getState }) => {
//   try {
//     const state = getState()
//     const token = state.session.accessToken || localStorage.getItem('token')
//     if (!token) return null
//     const refreshResponse = await $apiAxios.get('/auth/refresh', {
//       headers: {
//         Authorization: `Bearer ${token}`
//       },
//       withCredentials: true
//     })
//     const { data } = refreshResponse
//     if (!data) {
//       localStorage.clear('token')
//       clearSessionData()
//       return null
//     }
//     dispatch(setUser(data))
//   } catch (error) {
//     throw error
//   }
// })
