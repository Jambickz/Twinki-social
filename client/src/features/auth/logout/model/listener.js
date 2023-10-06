import { createListenerMiddleware } from '@reduxjs/toolkit'
import { logoutEvent } from '~shared/api/external/logoutEvent.js'
import { logoutThunk } from '../model/logout.js'

export const logoutEventListener = createListenerMiddleware()

export const startLogoutEventListener =
  logoutEventListener.startListening

startLogoutEventListener({
  actionCreator: logoutEvent,
  effect: async (_, api) => {
    api.dispatch(logoutThunk())
  }
})
