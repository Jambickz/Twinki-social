import styles from './fullPageError.module.css'
import { FullPageWrapper } from '../full-page-wrapper/index.js'

export const FullPageError = (props) => {
  // eslint-disable-next-line react/prop-types
  const { error } = props
  return (
    <FullPageWrapper>
      <div className={styles.wrapper}>
        <div className="container">
          <h1 className="logo-font">Something went wrong:</h1>
          {/* eslint-disable-next-line react/prop-types */}
          <ul className="error-messages">{error?.message}</ul>
        </div>
      </div>
    </FullPageWrapper>
  )
}
