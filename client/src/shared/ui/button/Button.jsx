import React from 'react'

import './Button.scss'
// eslint-disable-next-line react/display-name
export const Button = React.forwardRef(({ children, className, ...props }, ref) => {
  return (
		<button className={className || 'default-button'} {...props} ref={ref}>
			{children}
		</button>
  )
})
