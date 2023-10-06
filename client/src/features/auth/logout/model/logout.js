import { createAsyncThunk } from '@reduxjs/toolkit'
import $apiAxios from '~shared/api/internal/index.js'
import { clearSessionData } from '~entities/session/model/index.js'
export const logoutThunk = createAsyncThunk('user/logout', async (_, { dispatch, getState }) => {
  try {
    const state = getState()
    const token = state.session.accessToken
    await $apiAxios.post('/auth/logout', null, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    })
    localStorage.removeItem('token')
    dispatch(clearSessionData())
  } catch (error) {
    console.log(error)
    throw error
  }
})
