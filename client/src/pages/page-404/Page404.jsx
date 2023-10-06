import { useParams } from 'react-router-dom'
import { Loadable } from '~shared/ui/loadable/index.js'
import { lazy } from 'react'
import NotFound from '../../shared/ui/not-found/'

const ProfilePage = Loadable(lazy(() => import('~pages/profile')))

export const Page404 = () => {
  const params = useParams()
  const firstParamKey = Object.keys(params)[0]
  const paramsValue = params[firstParamKey]

  if (paramsValue && paramsValue.startsWith('@')) {
    const username = paramsValue.substring(1)
    return <ProfilePage username={username}/>
  }

  return <NotFound/>
}
