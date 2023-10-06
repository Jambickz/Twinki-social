import { ModalAuth } from '~widgets/modal-auth/'
import { useEffect, useState } from 'react'
import { useNotify } from '~shared/lib/notify'

export const WelcomePage = () => {
  const [authType, setAuthType] = useState(null)
  const { success } = useNotify()
  useEffect(() => {
    success('Welcome')
  }, [])
  const handleClickButton = (type) => {
    setAuthType(type)
  }

  return (
    <>
      {authType && <ModalAuth authType={authType} setAuthType={setAuthType} />}
      <div>
        WelcomePage
        <div>
          <button onClick={() => handleClickButton('register')}>register</button>
          <button onClick={() => handleClickButton('login')}>login</button>
        </div>
      </div>
    </>
  )
}
