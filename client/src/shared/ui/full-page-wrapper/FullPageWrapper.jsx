import styles from './full-page-wrapper.module.css'

export const FullPageWrapper = (props) => {
  // eslint-disable-next-line react/prop-types
  const { children } = props
  return <div className={styles.wrapper}>{children}</div>
}
