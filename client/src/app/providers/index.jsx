import { Router } from './RouterProvider.jsx'
import { BrowserRouter } from 'react-router-dom'

import { I18nextProvider } from 'react-i18next'
import i18n from '~shared/i18n/i18n.js'
import { ModalProvider } from './ModalProvider.jsx'

export const Provider = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <ModalProvider>
          <Router />
        </ModalProvider>
      </BrowserRouter>
    </I18nextProvider>
  )
}
