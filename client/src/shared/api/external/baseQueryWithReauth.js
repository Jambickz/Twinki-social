import { baseQuery } from './baseQuery.js'
import { invalidateAccessToken } from './invalidateTokenEvent.js'
import { Mutex } from 'async-mutex'
import { logoutEvent } from './logoutEvent.js'

const AUTH_ERROR_CODES = new Set([401])
const mutex = new Mutex()

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)
  if (typeof result.error?.status === 'number' &&
   AUTH_ERROR_CODES.has(result.error.status)) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        const refreshResult = await baseQuery(
          { ...args, url: '/auth/refresh', credentials: 'include' },
          api,
          extraOptions
        )
        if (refreshResult.data) {
          api.dispatch(invalidateAccessToken(refreshResult.data))
          result = await baseQuery(args, api, extraOptions)
        } else {
          api.dispatch(logoutEvent())
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}
