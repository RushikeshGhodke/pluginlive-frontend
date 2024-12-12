import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from "../api/index.js";

const VerifyOTP = () => {
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { email } = location.state || {}; // Get email passed from ForgotPassword

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await api.post('/users/verify-otp', { email, otp });
            setMessage(response.data.message);
            // Navigate to reset password page after successful OTP verification
            navigate('/reset-password', { state: { email } });
        } catch (error) {
            setMessage(error.response?.data?.message || 'Invalid OTP');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-[90vh] bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Verify OTP</h2>

                {/* Display success or error message */}
                {message && (
                    <div className={`mb-4 text-center text-sm ${message.includes('Invalid') ? 'text-red-500' : 'text-green-500'}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="otp" className="block text-sm font-semibold text-gray-700 mb-2">OTP</label>
                        <input
                            id="otp"
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={handleOtpChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 rounded-md text-white font-semibold ${loading ? 'bg-gray-400' : 'bg-[#3249D7] hover:bg-[#5B6DDF]'} focus:outline-none`}
                    >
                        {loading ? 'Verifying OTP...' : 'Verify OTP'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VerifyOTP;
