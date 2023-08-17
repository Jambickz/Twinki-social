import { ModalAuth } from '~widgets/modalAuth/'

export const WelcomePage = () => {
  const handleClickButton = (authType) => {
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
