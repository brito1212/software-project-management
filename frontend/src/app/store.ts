import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import toastReducer from '../features/toast/toastSlice'
import userReducer, { setupAuthListener } from '../features/user/userSlice'

const persistConfig = {
  key: 'root',
  storage
}

const reducers = combineReducers({
  user: userReducer,
  toast: toastReducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production'
})

setupAuthListener(store.dispatch)

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
