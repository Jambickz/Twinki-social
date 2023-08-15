import { useParams, useNavigate } from 'react-router-dom'
import { ModalAuth } from '~widgets/modalAuth'
import { useEffect } from 'react'
import { useModal } from '~shared/lib/modal'

export const AuthPage = () => {
  const { authType } = useParams()
  const { openModal } = useModal()
  const navigate = useNavigate()

  useEffect(() => {
    if (!['login', 'register', 'password_reset'].includes(authType)) {
      navigate('/')
    } else {
      handleClickFirstButton()
    }
  }, [authType, navigate])

  const handleClickFirstButton = () => {
    openModal({
      children: <ModalAuth authType={authType} />
    })
  }
  return (
    <div>
    </div>
  )
}
