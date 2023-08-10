import { useParams } from 'react-router-dom'
import { Login } from './login/Login'
import { SingUp } from './sign-up/SingUp'
import { PasswordReset } from './password-reset/PasswordReset'

export const AuthPage = () => {
  const { authType } = useParams()
  console.log(authType)
  return (
   <>
     {authType === 'login' && <Login />}
     {authType === 'signup' && <SingUp />}
     {authType === 'password_reset' && <PasswordReset />}
   </>
  )
}
