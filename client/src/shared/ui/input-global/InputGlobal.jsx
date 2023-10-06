import React from 'react'

// eslint-disable-next-line react/display-name
export const InputGlobal = React.forwardRef(({ className, ...props }, ref) => {
  const classes = `input-form-ui ${className}`
  return <input ref={ref} className={classes} {...props} />
})
