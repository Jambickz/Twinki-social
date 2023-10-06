import { LogoutButton } from '~features/auth/logout/index.js'
import { useMeQuery } from '~entities/session/api/index.js'

export const HomePage = () => {
  const { data, error, refetch:handleRefresh } = useMeQuery()
  return (
    <div>
      <LogoutButton/>
      {data && console.log(data)}
      {error && console.log(error)}
      <button onClick={handleRefresh}>update</button>
    </div>
  )
}
