import { configureStore } from '@reduxjs/toolkit'
import { internsApi } from '../services/internsApi'

export const store = configureStore({
  reducer: {
    [internsApi.reducerPath]: internsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(internsApi.middleware),
})
