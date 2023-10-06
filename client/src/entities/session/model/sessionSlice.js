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
      state.isAuthorized = true
      if (state.isAuthorized) {
        state.user = payload.user
        state.accessToken = payload.accessToken
      }
    }
  }
})
