import styles from './spinner.module.css'

export const Spinner = () => {
  return (
        <div className={styles['lds-ring']}>
            <div />
            <div />
            <div />
            <div />
        </div>
  )
}
