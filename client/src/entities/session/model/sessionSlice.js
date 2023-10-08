import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: undefined,
  isAuthorized: false,
  accessToken: undefined
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    clearSessionData: (state) => {
      state.accessToken = undefined
      state.user = undefined
      state.isAuthorized = false
    },
    setUser: (state, { payload }) => {
      if (!payload) return state.isAuthorized = false
      state.isAuthorized = true
      state.user = payload.user
      state.accessToken = payload.accessToken
    }
  }
})
