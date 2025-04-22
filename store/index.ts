import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './alertSlice';
import productListReducer from './productListSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    alert: alertReducer,
    productList: productListReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: { user: UserState, ... }
export type AppDispatch = typeof store.dispatch;
