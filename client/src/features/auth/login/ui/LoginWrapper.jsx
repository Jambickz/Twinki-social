import { FormField } from '~shared/ui/form-field/index.js'
import { InputForm as Input } from '~shared/ui/input-form/index.js'
import Form from 'rc-field-form'
import { useAppDispatch } from '~shared/lib/redux/index.js'
import { useLoginMutation } from '../index.js'
import { setUser } from '~entities/session/model/index.js'

export const LoginWrapper = ({ form, onClose }) => {
  const dispatch = useAppDispatch()
  const [login] = useLoginMutation()

  const onFinish = async () => {
    const identifier = form.getFieldValue('identifier')
    const password = form.getFieldValue('password')
    const result = await login({ login: identifier, password })
    console.log(result)
    const { data } = result.data
    const session = {
      user: data.user,
      accessToken: data.accessToken
    }
    localStorage.setItem('token', data.accessToken)
    dispatch(setUser(session))
    onClose()
  }

  return (
    <div>
      <Form onFinish={onFinish} form={form}>
        <FormField name="identifier" rules={[
          { required: true, message: 'Введите identifier Email || username' },
          { min: 4, message: 'Минимальная длина identifier 4 символов' }
        ]}>
          <Input type='identifier' placeholder="identifier" />
        </FormField>
        <FormField name="password" rules={[
          { required: true, message: 'Введите password' },
          { min: 8, message: 'Минимальная длина пароля 8 символов' }
        ]}>
          <Input type='password' placeholder="Пароль" />
        </FormField>
        <button type="Отправить">Submit</button>
      </Form>
    </div>
  )
}
