import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API Base URL
const API_BASE_URL = 'https://pluginlive-backend.onrender.com/api/v1';

// Fetch user data from localStorage
const userData = JSON.parse(localStorage.getItem('authData')) || null;

// Initial state
const initialState = {
    user: userData?.user || null,
    accessToken: userData?.accessToken || null,
    refreshToken: userData?.refreshToken || null,
    isAuthenticated: !!userData,
    loading: false,
    error: null,
};

// Thunks

// Login thunk
export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/users/login`, {email,password});
            console.log(email, password + "from slice")
            return response.data.data; // API's `data` field contains user details
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'An error occurred during login.'
            );
        }
    }
);

// Logout thunk (if backend logout logic is needed, otherwise this is local)
export const logoutThunk = createAsyncThunk(
    'auth/logout',
    async (_, { dispatch }) => {
        // Add API call for logout here if necessary
        dispatch(logout());
    }
);

// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;

            // Clear localStorage on logout
            localStorage.removeItem('authData');
        },
    },
    extraReducers: (builder) => {
        builder
            // Login logic
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;

                // Save user data to localStorage on successful login
                localStorage.setItem('authData', JSON.stringify(action.payload));
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Login failed';
            })

            // Logout logic (if using `logoutThunk`)
            .addCase(logoutThunk.fulfilled, (state) => {
                state.user = null;
                state.accessToken = null;
                state.refreshToken = null;
                state.isAuthenticated = false;
                state.loading = false;
                state.error = null;

                // Clear localStorage
                localStorage.removeItem('authData');
            });
    },
});

// Export actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
