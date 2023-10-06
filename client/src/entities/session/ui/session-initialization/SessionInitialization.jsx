import { useRefreshTokenQuery } from '~entities/session/api/index.js'
import { Spinner } from '~shared/ui/spinner/index.js'
import { FullPageWrapper } from '~shared/ui/full-page-wrapper/index.js'

export const SessionInitialization = ({ children }) => {
  const { isLoading } = useRefreshTokenQuery()

  if (isLoading) {
    return (
      <FullPageWrapper>
        <Spinner />
      </FullPageWrapper>
    )
  }
  return children
}
