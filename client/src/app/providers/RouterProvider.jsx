import { lazy } from 'react'
import { BrowserRouter, Route, Routes, ScrollRestoration } from 'react-router-dom'
import { MainLayout } from '~pages/layouts'
import { Loadable } from '~shared/ui/loadable'
import { CheckRoute } from '~shared/ui/check-route/index.js'

const HomePage = Loadable(lazy(() => import('~pages/home/HomePage.jsx')))
const AuthPage = Loadable(lazy(() => import('~pages/auth')))
const ProfilePage = Loadable(lazy(() => import('~pages/profile')))
const SettingsPage = Loadable(lazy(() => import('~pages/settings')))

const MessengerPage = Loadable(lazy(() => import('~pages/messenger')))

const Page404 = Loadable(lazy(() => import('~pages/page-404')))

// onlyNoAuth если true, то редиректит на главную когда заходишь авторизованным
// onlyAuth если true, то редиректит на главную когда заходишь авторизованным

const routes = [
  // HomePage - Начальная страница, новостная, просмотр постов
  { path: 'home', component: HomePage, onlyAuth: true },

  // AuthPage - Блок aунтификации и восстановление пароля
  { path: 'auth/login', component: AuthPage, onlyNoAuth: true },
  { path: 'auth/signup', component: AuthPage, onlyNoAuth: true },
  { path: 'auth/password_reset', component: AuthPage, onlyNoAuth: true },

  // ProfilePage - Страница пользователя
  { path: '@username', component: ProfilePage, onlyAuth: false },
  // SettingsPage - Страница настроек пользователя
  { path: 'settings', component: SettingsPage, onlyAuth: true },

  // MessengerPage - Страница чата
  { path: 'im', component: MessengerPage, onlyAuth: true },
  { path: 'im/@username', component: MessengerPage, onlyAuth: true },

  // Page404.jsx - Страница не найдена
  { path: '*', component: Page404, onlyAuth: false }
]

export const Router = () => {
  const { currentUser } = true
  console.log(Loadable)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          {routes.map(route => {
            const { path, component: Component } = route
            return (
                <Route key={path} path={path} element={<CheckRoute isAuth={currentUser} route={route}>
                    <ScrollRestoration><Component /></ScrollRestoration>
                </CheckRoute>} />
            )
          })
          }
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
