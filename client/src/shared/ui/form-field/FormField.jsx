import React from 'react'
import { Field } from 'rc-field-form'

const RenderItem = (props) => {
  const {
    field: { control, meta, form },
    children
  } = props

  const getProps = (name) => props[name]

  const childNode =
    typeof children === 'function'
      ? children(control, meta, form)
      : React.cloneElement(children, {
        ...control,
        ...getProps('hasFeedback')
      })

  return (
      <div>
        {childNode}
        {meta.errors.slice(0, 1).map((error, index) => (
          <div style={{ color: 'red' }} key={index}>{error}</div>
        ))}
      </div>
  )
}

export const FormField = (props) => {
  const { name, children, ...restProps } = props
  return (
    <Field name={name} {...restProps}>
      {(control, meta, form) => (
        <RenderItem field={{ control, meta, form }} {...props} />
      )}
    </Field>
  )
}
