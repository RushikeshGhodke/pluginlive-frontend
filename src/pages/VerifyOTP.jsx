import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyOTP = () => {
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { email } = location.state || {}; // Get email passed from ForgotPassword

    // Handle OTP change
    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    // Handle OTP submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await axios.post('http://localhost:3000/api/v1/users/verify-otp', { email, otp });
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
        <div className="verify-otp-container">
            <h2>Enter OTP</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={handleOtpChange}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Verifying OTP...' : 'Verify OTP'}
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default VerifyOTP;
