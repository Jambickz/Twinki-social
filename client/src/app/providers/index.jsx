import { Router } from './RouterProvider.jsx'
import { I18nextProvider } from 'react-i18next'
import i18n from '~shared/i18n/i18n.js'
export const Provider = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <Router />
    </I18nextProvider>
  )
}
