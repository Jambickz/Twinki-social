import Form from 'rc-field-form'
import { InputForm as Input } from '~shared/ui/input-form'
import { FormField } from '~shared/ui/form-field'
import { setUser } from '~entities/session/model/index'
import { useRegisterMutation } from '../../api/'
import { useAppDispatch } from '~shared/lib/redux'

export const FifthStep = ({ nextStep, form }) => {
  const [register] = useRegisterMutation()
  const dispatch = useAppDispatch()

  const email = form.getFieldValue('email')
  const profileName = form.getFieldValue('name')

  const onFinish = async () => {
    const password = form.getFieldValue('password')
    const result = await register({ email, profileName, password })
    console.log(result)
    const { data } = result.data
    const session = {
      user: data.user,
      accessToken: data.accessToken
    }
    localStorage.setItem('token', data.accessToken)
    dispatch(setUser(session))
    nextStep()
  }
  
  return (
    <div>
      Password
      <Form onFinish={onFinish} form={form}>
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
