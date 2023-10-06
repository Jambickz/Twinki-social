import { MultiStepButton as NavButton } from '~shared/ui/multi-step-button'
import { useModal } from '~shared/lib/modal/index.js'
import { useForm } from 'rc-field-form'
import { useEffect } from 'react'
import { LoginWrapper } from '~features/auth/login/index.js'
const Wrapper = ({ ...props }) => {
  return (
    <>
      <NavButton {...props} />
      <LoginWrapper {...props} />
    </>
  )
}
export const Login = ({ setAuthType }) => {
  const { openModal, closeModal, ModalWrapper } = useModal()
  const [form] = useForm()
  useEffect(() => {
    openModal(renderComponent())
  }, [])

  const handleClose = () => {
    closeModal()
    if (setAuthType) setAuthType(null)
  }
  const renderComponent = () => {
    const commonProps = { onClose: handleClose, form }
    return <Wrapper {...commonProps} />
  }
  return <ModalWrapper />
}
