import $api from '~shared/api'

export const profileApi = $api.injectEndpoints({
  endpoints: (build) => ({
    profile: build.query({
      query: (username) => ({
        url: `/user/${username}`
      })
    }),
    feed: build.query({
      query: (username) => ({
        url: `/posts/${username}`
      })
    })
  })
})
