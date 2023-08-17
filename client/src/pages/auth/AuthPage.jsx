import { useParams, useNavigate } from 'react-router-dom'
import { ModalAuth } from '~widgets/modalAuth'
import { useEffect } from 'react'

export const AuthPage = () => {
  const { authType } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!['login', 'register', 'password_reset'].includes(authType)) {
      navigate('/')
    } else {
      handleClickFirstButton()
    }
  }, [authType, navigate])

  const handleClickFirstButton = () => {
  }
  return (
    <div>
    </div>
  )
}
