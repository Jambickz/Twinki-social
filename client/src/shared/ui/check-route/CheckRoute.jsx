import { Navigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
export const CheckRoute = ({ isAuth, route, children }) => {
  console.log(children)
  // eslint-disable-next-line react/prop-types
  if (route.onlyAuth && !isAuth) return <Navigate to="/auth" />
  // eslint-disable-next-line react/prop-types
  if (route.onlyNoAuth && !isAuth) return <Navigate to="/" />
  return children
}
