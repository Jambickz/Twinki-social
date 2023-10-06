import Form from 'rc-field-form'
import { InputForm as Input } from '~shared/ui/input-form'
import { FormField } from '~shared/ui/form-field'

const today = new Date()
const todayFormatted = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`
export const FirstStep = ({ nextStep, form }) => {
  const onFinish = async values => nextStep()

  return (
    <Form onFinish={onFinish} form={form}>
      <div>
          <FormField form={form} name="name" rules={[
            { required: true, message: 'Введите name' },
            { min: 2, max: 50, message: 'Имя пользователя должно быть от 2 до 50 символов' }
          ]}>
            <Input placeholder="Name" />
          </FormField>
          <FormField form={form} name="email" rules={[
            { required: true, message: 'Введите email' },
            { type: 'email', message: 'Некорректный формат email' }
          ]}>
            <Input placeholder="Email" />
          </FormField>
          <FormField form={form} name="birthdate" rules={[{ required: true }]}>
            <Input placeholder="Birthdate" min="1900-01-01" max={todayFormatted} type="date" />
          </FormField>
        <div>
          <button type="submit">Submit</button>
        </div>
      </div>
    </Form>
  )
}
