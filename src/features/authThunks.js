import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { loginRequest, loginSuccess, loginFailure } from './authSlice';

// Async thunk for login
export const login = createAsyncThunk(
    'auth/login',
    async (credentials, { dispatch, rejectWithValue }) => {
        try {
            dispatch(loginRequest());
            const response = await axios.post('http://localhost:3000/api/v1/users/login', credentials);
            const { data } = response.data;
            dispatch(loginSuccess(data));
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Login failed';
            dispatch(loginFailure(errorMessage));
            return rejectWithValue(errorMessage);
        }
    }
);
