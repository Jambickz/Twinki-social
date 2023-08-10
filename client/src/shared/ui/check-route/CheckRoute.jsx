import { Navigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
export const CheckRoute = ({ isAuth, route, children }) => {
  console.log(`Auth? ${Boolean(isAuth)}`)
  // eslint-disable-next-line react/prop-types
  if (route.onlyAuth && !isAuth) return <Navigate to="/auth/login" />
  // eslint-disable-next-line react/prop-types
  if (route.onlyNoAuth && isAuth) return <Navigate to="/" />
  return children
}
