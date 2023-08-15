import { useParams, useNavigate } from 'react-router-dom'
import { ModalAuth } from '~widgets/modalAuth'

export const AuthPage = () => {
  const { authType } = useParams()
  const navigate = useNavigate()
  if (!['login', 'signup', 'password_reset'].includes(authType)) {
    navigate('/')
    return null
  }
  return (
    <>
      {authType === 'login' && <ModalAuth authType={authType} />}
      {authType === 'signup' && <ModalAuth authType={authType} />}
      {authType === 'password_reset' && <ModalAuth authType={authType} />}
    </>
  )
}
