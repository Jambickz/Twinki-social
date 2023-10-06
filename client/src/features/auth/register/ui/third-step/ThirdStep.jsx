import { useSubmitCodeMutation } from '../../api/'
export const ThirdStep = ({ form, nextStep }) => {
  const [submitCode] = useSubmitCodeMutation()
  const email = form.getFieldValue('email')

  const sendEmail = async () => {
    try {
      if (!email) return 'error'
      await submitCode({ email }).unwrap()
    } catch (error) {
      console.error('Ошибка при отправке кода:', error)
    }
  }
  const next = () => {
    sendEmail()
    nextStep()
  }
  return (
    <div>
      CAPTCHA
      <button>Click to check</button>
      <button onClick={next}>Next</button>
    </div>
  )
}
