import { useProfileQuery } from '~entities/profile/api/index.js'
import { useEffect } from 'react'
import NotFound from '~shared/ui/not-found/index.js'

export const ProfileCard = ({ username, isGuest, isCurrentUser }) => {
  const { data, error, isLoading } = useProfileQuery(username)

  if (isLoading) {
    return <div>Skeleton</div>
  }

  if (error) {
    console.log(error)
    if (error?.data?.message === 'ERROR_USER_NOT_FOUND') return <NotFound profile={true} />
    return <div>Error: {error?.data?.message || error?.error}</div>
  }
  if (data) console.log(data)

  return (
    <div>
      sex
    </div>
  )
}
