import { InputGlobal as Input } from '~shared/ui/input-global'
import { useRef } from 'react'
import { useCheckCodeMutation } from '../../api/'
import { useNotify } from '~shared/lib/notify'

export const FourthStep = ({ form, nextStep }) => {
  const codeRef = useRef(null)
  const email = form.getFieldValue('email')
  const [checkCode] = useCheckCodeMutation()
  const { error } = useNotify()
  const nextButton = async () => {
    try {
      const code = codeRef.current.value.trim()
      if (!code) return error('Неверно введен код')
      const response = await checkCode({ code, email }).unwrap()
      if (!response.status) throw new Error(response.data.data)
      nextStep()
    } catch (e) {
      error('error', e.data.data)
    }
  }
  return (
    <div>
      На вашу почту {email} был отправлен код для подтверждения аккаунта
      введите его сюда
      <Input ref={codeRef} placeholder="code" />
      <button onClick={nextButton}>next</button>
    </div>
  )
}
