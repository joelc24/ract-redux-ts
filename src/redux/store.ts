import {
  type ThunkAction,
  configureStore,
  type Action
} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './slice/auth';
import settingsReducer from './slice/settings';

const persistAuthConfig = {
  key: 'auth',
  storage,
  whiteList: ['accessToken']
};

const persistSettingsConfig = {
  key: 'settings',
  storage,
  whiteList: ['themeMode']
};

const store = configureStore({
  reducer: {
    auth: persistReducer<ReturnType<typeof authReducer>>(
      persistAuthConfig,
      authReducer
    ),
    settings: persistReducer<ReturnType<typeof settingsReducer>>(
      persistSettingsConfig,
      settingsReducer
    )
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware({
      serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
export type Thunk = ThunkAction<
  Promise<unknown>,
  RootState,
  unknown,
  Action<string>
>;

export const persistor = persistStore(store);

export default store;
