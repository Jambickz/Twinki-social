import { useParams, useNavigate } from 'react-router-dom'
import { ModalAuth } from '~widgets/modal-auth'
import { useEffect } from 'react'

export const AuthPage = () => {
  const { authType } = useParams()
  const navigate = useNavigate()
  useEffect(() => {

    const validAuthTypes = ['login', 'register', 'password_reset']
    if (!validAuthTypes.includes(authType)) {
      navigate('/')
    }
  }, [authType, navigate])

  return <ModalAuth authType={authType} />
}
