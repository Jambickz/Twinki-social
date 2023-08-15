import { ModalAuth } from '~widgets/modalAuth/'
import { useModal } from '~shared/lib/modal'

export const WelcomePage = () => {
  const { openModal } = useModal()

  const handleClickButton = (authType) => {
    openModal({
      children: <ModalAuth authType={authType} />
    })
  }
  return (
    <div>
      WelcomePage
      <div>
        <button onClick={() => handleClickButton('register')}>register</button>
        <button onClick={() => handleClickButton('login')}>login</button>
      </div>
    </div>
  )
}
