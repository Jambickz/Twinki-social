import { useAppDispatch } from '~shared/lib/redux/index.js'
import { logoutThunk } from '~features/auth/logout/model/logout.js'
import { useLogoutMutation } from '~features/auth/logout/api/index.js'

export const LogoutButton = () => {
  const dispatch = useAppDispatch()
  // const [logout] = useLogoutMutation()
  const onConfirmLogout = async () => {
    // try {
    //   const response = await logout()
    //   if (response.data) {
    //     console.log(response)
    //     dispatch(logoutThunk())
    //   }
    // } catch (error) {
    //   console.error('Logout error', error)
    // }
    dispatch(logoutThunk())
  }
  return (
    <button onClick={onConfirmLogout}>
      logout
    </button>
  )
}
