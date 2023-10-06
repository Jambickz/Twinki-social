import { Router } from './RouterProvider.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import i18n from '~shared/i18n/i18n.js'
import { appStore } from '~app/store'
import { SessionInitialization } from '~entities/session/ui/session-initialization/index.js'

export const Provider = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <ReduxProvider store={appStore}>
        <BrowserRouter>
          <SessionInitialization>
            <Router />
          </SessionInitialization>
        </BrowserRouter>
      </ReduxProvider>
    </I18nextProvider>
  )
}
