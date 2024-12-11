import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/authSlice.js';
import { Link, Navigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [validationErrors, setValidationErrors] = useState({});
    const dispatch = useDispatch();
    const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

    const validateFields = () => {
        const errors = {};
        if (!credentials.email) {
            errors.email = 'Email is required.';
        } else if (!/^\S+@\S+\.\S+$/.test(credentials.email)) {
            errors.email = 'Enter a valid email address.';
        }
        if (!credentials.password) {
            errors.password = 'Password is required.';
        }
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
        setValidationErrors({ ...validationErrors, [name]: '' }); // Clear specific error on input change
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateFields()) {
            dispatch(login(credentials));
        }
    };

    if (isAuthenticated) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <div className="flex items-center justify-center h-[90vh] bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-10 max-w-md w-full">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Email Id <sup>*</sup>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={credentials.email}
                            onChange={handleChange}
                            className={`mt-2 w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                                validationErrors.email
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 focus:ring-blue-500'
                            }`}
                        />
                        {validationErrors.email && (
                            <p className="text-sm text-red-500 mt-1">{validationErrors.email}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Password <sup>*</sup>
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={credentials.password}
                            onChange={handleChange}
                            className={`mt-2 w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                                validationErrors.password
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 focus:ring-blue-500'
                            }`}
                        />
                        {validationErrors.password && (
                            <p className="text-sm text-red-500 mt-1">{validationErrors.password}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
                            loading ? 'bg-gray-400' : 'bg-[#3249D7] hover:bg-[#5B6DDF]'
                        } focus:outline-none`}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className="flex justify-between items-center mt-4 text-sm text-[#3249D7]">
                    <Link to="/forgot" className="hover:text-blue-500">
                        Forgot Password?
                    </Link>
                    <Link to="/register" className="hover:text-blue-500">
                        Register
                    </Link>
                </div>

                {error && (
                    <p className="text-center text-red-500 text-sm mt-4">
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Login;
