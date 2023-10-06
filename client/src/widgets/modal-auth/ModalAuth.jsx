import { Login, Register, PasswordReset} from '~widgets/modal-auth/'

export const ModalAuth = ({ authType, setAuthType }) => {
  return (
    <>
      {authType === 'login' && <Login setAuthType={setAuthType}/>}
      {authType === 'register' && <Register setAuthType={setAuthType}/>}
      {authType === 'password_reset' && <PasswordReset setAuthType={setAuthType}/>}
    </>
  )
}
