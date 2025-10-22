import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import carsReducer from './slices/carsSlice'
import searchReducer from './slices/searchSlice'
import persistReducer from 'redux-persist/es/persistReducer'
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage'

const searchPersistConfig = {
  key: 'search',
  storage,
  whitelist: ['searchForm']
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cars: carsReducer,
    search: persistReducer(searchPersistConfig, searchReducer)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER']
      }
    })
})

export const persistor = persistStore(store)
