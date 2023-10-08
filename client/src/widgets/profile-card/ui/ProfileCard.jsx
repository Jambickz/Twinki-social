import { useProfileQuery } from '~entities/profile/api/index.js'
import { useAppSelector } from '~shared/lib/redux/index.js'
import NotFound from '~shared/ui/not-found/index.js'
import { Spinner } from '~shared/ui/spinner/index.js'
import { IoAdd, IoSettingsSharp } from 'react-icons/io5'
import Button from '~shared/ui/button/index.js'

const ProfileWrapper = ({ children }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '11rem'
      }}
    >
      {children}
    </div>
  )
}

export const ProfileCard = ({ username }) => {
  const { error, data: profile, isLoading, isSuccess } = useProfileQuery(username)

  const user = useAppSelector(state => state.session.user)
  const isAuth = Boolean(user)
  const isGuest = !isAuth
  const isCurrentUser = isAuth && user?.username === username
  const isUser = isAuth && !(user?.username === username)

  if (isLoading) {
    return (
      <ProfileWrapper>
        <Spinner />
      </ProfileWrapper>
    )
  }

  if (error) {
    console.log(error)
    if (error?.data?.message === 'ERROR_USER_NOT_FOUND') return <NotFound profile={true} />
    return <div>Error: {error?.data?.message || error?.error}</div>
  }
  if (profile) console.log(profile)

  return (
    <div>
      {isSuccess && (
        <div>
          <img src={profile.data.image} className="user-img" alt={username} />
          <h4>{profile.data.profileName}</h4>
          <h4>{profile.data.username}</h4>
          <p>{profile.data.bio}</p>

          {isGuest && (
            <Button
              color="secondary"
              variant="outline"
              className="action-btn"
              onClick={() => console.log('auth')}
            >
              <IoAdd size={16} />
              &nbsp; Follow {profile.data.username}
            </Button>
          )}

          {isCurrentUser && (
            <Button
              color="secondary"
              variant="outline"
              className="action-btn"
              onClick={() => console.log('edit profile')}
            >
              <IoSettingsSharp size={14} />
              &nbsp; Edit Profile Settings
            </Button>
          )}

          {isUser && <div>Если юзер не равен нашему юзеру, то тут кнопка фоллов или унфолов </div>}

        </div>
      )
      }
    </div>
  )
}
