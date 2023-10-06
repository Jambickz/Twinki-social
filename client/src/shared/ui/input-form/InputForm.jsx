export const InputForm = ({ className, value = '', ...props }) => {
  const classes = `input-form-ui ${className}`
  return <input className={classes} value={value} {...props}/>
}
