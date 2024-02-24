import { configureStore } from '@reduxjs/toolkit';
import authSlice from './user-authentication/authSlice';

export const store = configureStore({
  reducer: {
    // Setup reducers here
    auth: authSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
