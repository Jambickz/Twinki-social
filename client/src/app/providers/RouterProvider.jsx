import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { MainLayout } from '~pages/layouts'
import { Loadable } from '~shared/ui/loadable'
import { CheckRoute } from '~shared/ui/check-route/index.js'
import { useAppSelector } from '~shared/lib/redux/index.js'

const HomePage = Loadable(lazy(() => import('~pages/home')))
const WelcomePage = Loadable(lazy(() => import('~pages/welcome')))

const AuthPage = Loadable(lazy(() => import('~pages/auth')))
const TestPage = Loadable(lazy(() => import('~pages/test')))
// const SettingsPage = Loadable(lazy(() => import('~pages/settings')))
//
// const MessengerPage = Loadable(lazy(() => import('~pages/messenger')))

const Page404 = Loadable(lazy(() => import('~pages/page-404')))

// onlyNoAuth если true, то редиректит на главную когда заходишь авторизованным
// onlyAuth если true, то редиректит на главную когда заходишь авторизованным

const routesWithLayout = [
  // HomePage - Начальная страница, новостная, просмотр постов
  { path: 'home', component: HomePage, onlyAuth: true },

  // // SettingsPage - Страница настроек пользователя
  // { path: 'settings', component: SettingsPage, onlyAuth: true },
  //
  // // MessengerPage - Страница чата
  // { path: 'im', component: MessengerPage, onlyAuth: true },
  // { path: 'im/@username', component: MessengerPage, onlyAuth: true },
  // Page404.jsx - Страница не найдена
  { path: '*', component: Page404, onlyAuth: false }

]
const routesWithoutLayout = [
  { path: '', component: WelcomePage, onlyNoAuth: true },
  // AuthPage - Блок aунтификации и восстановление пароля
  { path: 'auth/:authType', component: AuthPage, onlyNoAuth: true },

  { path: 'test', component: TestPage, onlyAuth: false }
]

export const Router = () => {
  console.log('render router')
  const currentUser = useAppSelector(state => state.session.isAuthorized)
  console.log(currentUser)
  return (
      <Routes>
        <Route path="/">
          {routesWithoutLayout.map(route => {
            const { path, component: Component } = route
            return (
              <Route key={path} path={path} element={<CheckRoute isAuth={currentUser} route={route}>
                <Component />
              </CheckRoute>} />
            )
          })
          }
        </Route>
        <Route path="/" element={<MainLayout />}>
          {routesWithLayout.map(route => {
            const { path, component: Component } = route
            return (
              <Route key={path} path={path} element={<CheckRoute isAuth={currentUser} route={route}>
                <Component />
              </CheckRoute>} />
            )
          })
          }
        </Route>
      </Routes>
  )
}
