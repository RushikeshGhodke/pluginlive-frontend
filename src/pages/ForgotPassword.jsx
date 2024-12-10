import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from "../api/index.js";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Handle email change
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await api.post('/users/forgot-password', { email });
            setMessage(response.data.message);
            // Navigate to OTP verification page after successful email submission
            navigate('/verify-otp', { state: { email } });
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgot-password-container">
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ForgotPassword;
