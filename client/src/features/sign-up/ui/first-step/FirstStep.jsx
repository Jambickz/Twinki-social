import Form, { Field, useForm } from 'rc-field-form'

const Input = ({ value = '', ...props }) => <input value={value} {...props} />

export const FirstStep = ({ setStep }) => {
  const [form] = useForm()

  const onFinish = async (values) => {
    setStep(2)
  }

  const validateEmailExistence = async (_, email) => {
    try {
    } catch (error) {
    }
  }

  return (
    <div>
      <h2>Создание учетной записи</h2>
      <Form onFinish={onFinish} form={form}>
        <Field
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Введите email' },
            { type: 'email', message: 'Некорректный формат email' },
            { validator: validateEmailExistence }
          ]}
        >
          <Input placeholder="email" type="email" />

        </Field>
        <Field
          name="password"
          label="Пароль"
          rules={[
            { required: true, message: 'Введите пароль' },
            { min: 8, max: 128, message: 'Пароль должен быть от 8 до 128 символов' }
          ]}
        >
          <Input placeholder="Password" />
        </Field>
        <Field>
          <button onClick={onFinish} type="submit">
            Зарегистрироваться
          </button>
        </Field>
      </Form>
    </div>
  )
}
