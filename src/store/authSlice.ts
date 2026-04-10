import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const token = localStorage.getItem('token');

const initialState: AuthState = {
  token,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(state, action: PayloadAction<{ username: string; password: string }>) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<string>) {
      state.token = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.token = null;
      state.loading = false;
      state.error = null;
    }
  }
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
export default authReducer;
