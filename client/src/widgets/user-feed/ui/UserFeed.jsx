import { Spinner } from '~shared/ui/spinner/index.js'
import { useProfileQuery } from '~entities/profile/api/index.js'
const FeedWrapper = ({ children }) => {
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
export const UserFeed = ({ username }) => {
  const { error, data: feed, isLoading, isSuccess } = useProfileQuery(username)

  if (isLoading) {
    return (
      <FeedWrapper>
        <Spinner />
      </FeedWrapper>
    )
  }

  if (error) {
    console.log(error)
    if (error?.data?.message === 'ERROR_FEEDS_NOT_FOUND') return <div>Тут новостей нет</div>
    return <div>Error: {error?.data?.message || error?.error}</div>
  }

  return (
    <div>
      {isSuccess && (
        <div>Success</div>
      )}
    </div>
  )
}
