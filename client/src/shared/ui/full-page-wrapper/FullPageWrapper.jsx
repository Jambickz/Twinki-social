import styles from './full-page-wrapper.module.css'

export const FullPageWrapper = (props) => {
  const { children } = props
  return <div className={styles.wrapper}>{children}</div>
}
