import { createListenerMiddleware } from '@reduxjs/toolkit'
import { invalidateAccessToken } from '~shared/api/external/invalidateTokenEvent.js'
import { updateToken } from '../../login/model/updateToken.js'

export const invalidateAccessTokenListener = createListenerMiddleware()

export const startInvalidateAccessTokenListener =
  invalidateAccessTokenListener.startListening

startInvalidateAccessTokenListener({
  actionCreator: invalidateAccessToken,
  effect: async ({ payload }, api) => {
    api.dispatch(updateToken(payload))
  }
})
