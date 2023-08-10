import { Suspense } from 'react'
import { FullPageWrapper } from '../full-page-wrapper'
import { Spinner } from '../spinner'

export const Loadable = (Component) => {
  return function Fn (props) {
    return (
      <Suspense
        fallback={
          <FullPageWrapper>
            <Spinner />
          </FullPageWrapper>
        }
      >
        <Component {...props} />
      </Suspense>
    )
  }
}
