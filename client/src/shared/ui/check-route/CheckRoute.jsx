import { Navigate } from 'react-router-dom'

export const CheckRoute = ({ isAuth, route, children }) => {
  console.log(`Auth? ${Boolean(isAuth)}`)
  if (route.onlyAuth && !isAuth) return <Navigate to="/" />
  if (route.onlyNoAuth && isAuth) return <Navigate to="/home" />
  return children
}
