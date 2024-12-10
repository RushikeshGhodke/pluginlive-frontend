import React, { useState } from 'react';
import {Link, Navigate, useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
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
            console.log(email)
            const response = await api.post('/users/reset-password', {
                email,
                password
            });
            setMessage(response.data.message);

            setTimeout(() => {
                navigate("/login")
            }, 5000);

        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reset-password-container">
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Resetting password...' : 'Reset Password'}
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResetPassword;
