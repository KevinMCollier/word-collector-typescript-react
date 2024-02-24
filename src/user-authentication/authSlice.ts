import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from './AuthStateProps'

const initialState: AuthState = {
  user: null,
  token: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: { email: string }; token: string }>) => {

    },
    logout: (state) => {

    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
