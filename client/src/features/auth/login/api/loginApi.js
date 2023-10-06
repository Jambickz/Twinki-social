import $api from '~shared/api'

export const loginApi = $api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: ({ login, password }) => ({
        url: '/auth/login',
        method: 'POST',
        body: { login, password }
      })
    })

  })
})
