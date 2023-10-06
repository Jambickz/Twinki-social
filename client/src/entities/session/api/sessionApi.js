import $api from '~shared/api'
import { clearSessionData, setUser } from '~entities/session/model/index.js'

export const sessionApi = $api.injectEndpoints({
  endpoints: (build) => ({
    me: build.query({
      query: () => ({
        url: '/me'
      })
    }),
    refreshToken: build.query({
      query: () => '/auth/connect',
      async onQueryStarted (arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data.data.user))
        } catch (e) {
          dispatch(clearSessionData())
        }
      }
    })
  })
})
