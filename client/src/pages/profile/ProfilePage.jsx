import { ProfileCard } from '~widgets/profile-card/index.js'
import { useAppSelector } from '~shared/lib/redux/index.js'
import { useEffect } from 'react'

export const ProfilePage = ({ username }) => {
  const user = useAppSelector(state => state.session.user)
  const isAuth = Boolean(user)
  const isGuest = !isAuth
  const isCurrentUser = isAuth && user?.username === username

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [username])

  return (
    <div>
      <ProfileCard username={username} isGuest={isGuest} isCurrentUser={isCurrentUser}/>
    </div>
  )
}
