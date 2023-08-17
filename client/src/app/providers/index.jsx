import { Router } from './RouterProvider.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import i18n from '~shared/i18n/i18n.js'
import { store } from '~app/store'

export const Provider = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <ReduxProvider store={store}>
          <Router />
        </ReduxProvider>
      </BrowserRouter>
    </I18nextProvider>
  )
}
