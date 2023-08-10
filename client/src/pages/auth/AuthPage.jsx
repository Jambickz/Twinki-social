import { useParams, useNavigate } from 'react-router-dom'
import { Login } from './login/Login'
import { SingUp } from './sign-up/SingUp'
import { PasswordReset } from './password-reset/PasswordReset'

export const AuthPage = () => {
  const { authType } = useParams()
  const navigate = useNavigate()
  const handleInvalidAuthType = () => {
    navigate('/*')
  }
  console.log(authType)
  return (
    <>
      {authType === 'login' && <Login />}
      {authType === 'signup' && <SingUp />}
      {authType === 'password_reset' && <PasswordReset />}
      {!['login', 'signup', 'password_reset'].includes(authType) && handleInvalidAuthType()}
    </>
  )
}
