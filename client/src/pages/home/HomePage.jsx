import $api from '~shared/api'

export const HomePage = () => {
  const { useGetUserQuery } = $api
  const { data: user, isLoading, isError } = useGetUserQuery(10)

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error loading user.</p>
  }
  return (
    <div>
      <h1>HomePage</h1>
      <p>Username: {user.data.username}</p>
      <p>Email: {user.data.email}</p>
    </div>
  )
}
