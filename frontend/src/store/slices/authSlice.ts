import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser as loginAPI } from '../../services/api';
import { AuthState } from '../../types';

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  user: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
    try {
      console.log('Login Attempt:', { username });
      const response = await loginAPI(username, password);
      console.log('Login Response:', response);

      // Ensure we're storing the correct token
      const token = response.access || response.token;
      if (!token) {
        throw new Error('No access token received');
      }

      localStorage.setItem('token', token);
      return { token, user: response.user };
    } catch (error: any) {
      console.error('Login Error Details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
      return rejectWithValue(
        error.response?.data?.detail || 
        error.message || 
        'Login failed'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('token');
      window.location.href = '/login';
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.token = null;
        state.isAuthenticated = false;
        state.error = action.payload as string || 'Login failed';
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
