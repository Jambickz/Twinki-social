import $api from '~shared/api'

export const logoutApi = $api.injectEndpoints({
  endpoints: (build) => ({
    logout: build.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        body: { }
      })
    })
  })
})
