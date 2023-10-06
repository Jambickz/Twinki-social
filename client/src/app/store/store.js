import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import $api from '~shared/api'
import sessionSlice from '~entities/session/model'
import { invalidateAccessTokenListener } from '~features/auth/invalidateAccessToken'
import { logoutEventListener } from '~features/auth/logout/model/listener.js'

const rootReducer = combineReducers({
  [$api.reducerPath]: $api.reducer,
  [sessionSlice.name]: sessionSlice.reducer
})

export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat($api.middleware, invalidateAccessTokenListener.middleware, logoutEventListener.middleware),
    devTools: true
  })
  setupListeners(store.dispatch)
  return store
}

export const appStore = makeStore()
