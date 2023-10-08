import { ProfileCard } from '~widgets/profile-card'
import { useEffect } from 'react'
import { UserFeed } from '~widgets/user-feed'

export const ProfilePage = ({ username }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [username])

  return (
    <div>
      <ProfileCard username={username}/>
      <UserFeed username={username}/>
    </div>
  )
}
