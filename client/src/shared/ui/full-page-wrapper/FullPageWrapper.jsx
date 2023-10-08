import styles from './full-page-wrapper.module.css'

export const FullPageWrapper = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>
}
