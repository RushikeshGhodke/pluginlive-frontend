import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from "../api/index.js";

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const { email } = location.state || {};
    const navigate = useNavigate();

    // Handle password change
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    // Handle confirm password change
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const response = await api.post('/users/reset-password', {
                email,
                password
            });
            setMessage(response.data.message);

            setTimeout(() => {
                navigate("/login");
            }, 5000); // Redirect to login page after 5 seconds

        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-[90vh] bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Reset Password</h2>

                {/* Display message feedback */}
                {message && (
                    <div className={`mb-4 text-center text-sm ${message.includes('Passwords do not match') || message.includes('error') ? 'text-red-500' : 'text-green-500'}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter new password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 rounded-md text-white font-semibold ${loading ? 'bg-gray-400' : 'bg-[#3249D7] hover:bg-[#5B6DDF]'} focus:outline-none`}
                    >
                        {loading ? 'Resetting password...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
