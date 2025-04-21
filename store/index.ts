import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './alertSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    alert: alertReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: { user: UserState, ... }
export type AppDispatch = typeof store.dispatch;
