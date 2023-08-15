import { Modal } from '~shared/ui/modal'
import { Login } from '~widgets/modalAuth/login/Login.jsx'
import { SingUp } from '~widgets/modalAuth/sign-up/SingUp.jsx'
import { PasswordReset } from '~widgets/modalAuth/password-reset/PasswordReset.jsx'
import { useState } from 'react'

export const ModalAuth = (authType) => {
  const [active, setActive] = useState(true)

  return (
    <Modal active={active} setActive={setActive}>
      {authType === 'login' && <Login />}
      {authType === 'signup' && <SingUp />}
      {authType === 'password_reset' && <PasswordReset />}
    </Modal>
  )
}
