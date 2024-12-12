import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice.js';
import assessmentReducer from "../features/assessmentSlice.js";

const store = configureStore({
    reducer: {
        auth: authReducer,
        assessment: assessmentReducer,
    }
});

export default store;
