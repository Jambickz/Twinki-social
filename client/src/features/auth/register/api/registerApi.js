import $api from '~shared/api'

export const registerApi = $api.injectEndpoints({
  endpoints: (build) => ({
    submitCode: build.mutation({
      query: ({ email }) => ({
        url: '/auth/create-code',
        method: 'POST',
        body: { email }
      })
    }),
    checkCode: build.mutation({
      query: ({ email, code }) => ({
        url: '/auth/check-code',
        method: 'POST',
        body: { email, code }
      })
    }),
    register: build.mutation({
      query: ({ email, password, profileName }) => ({
        url: '/auth/registration',
        method: 'POST',
        body: { email, password, profileName }
      })
    })
  })
})
