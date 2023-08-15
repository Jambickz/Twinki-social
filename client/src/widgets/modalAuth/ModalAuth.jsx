import { Login, SingUp } from '~widgets/modalAuth/'
import { PasswordReset } from '~widgets/modalAuth/password-reset/PasswordReset.jsx'

export const ModalAuth = ({ authType }) => {
  return (
    <>
      {authType === 'login' && <Login/>}
      {authType === 'register' && <SingUp/>}
      {authType === 'password_reset' && <PasswordReset/>}
    </>
  )
}
