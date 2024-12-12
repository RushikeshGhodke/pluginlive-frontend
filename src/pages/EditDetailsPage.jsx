import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../api/index.js';
import { login } from '../features/authSlice.js';

const EditDetailsPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Fetch current user details and token from Redux state
    const { user, accessToken } = useSelector((state) => state.auth);

    // State to handle form input values
    const [formData, setFormData] = useState({
        fullname: '',
        username: '',
        email: '',
        college: '',
        course: '',
        yearOfStudy: '',
        role: '',
        country: '',
        state: '',
        avatar: null, // Handle file input for avatar
    });

    // State to handle error/success messages
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Populate form fields with existing user data
    useEffect(() => {
        if (user) {
            setFormData({
                fullname: user.fullname || '',
                username: user.username || '',
                email: user.email || '',
                college: user.college || '',
                course: user.course || '',
                yearOfStudy: user.yearOfStudy || '',
                role: user.role || 'Student',
                country: user.country || '',
                state: user.state || '',
                avatar: null, // File inputs cannot be pre-filled
            });
        }
    }, [user]);

    // Handle change in form input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle avatar file change
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files[0], // We only accept one file
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare data for the API request
        const updatedData = {
            fullname: formData.fullname,
            username: formData.username,
            email: formData.email,
            college: formData.college,
            course: formData.course,
            yearOfStudy: formData.yearOfStudy,
            role: formData.role,
            country: formData.country,
            state: formData.state,
        };

        try {
            // Ensure token is available
            if (!accessToken) {
                setError('You must be logged in to update your details.');
                return;
            }

            console.log(updatedData)
            console.log(accessToken)
            // Send update request to the server
            const response = await api.put('/users/edit', updatedData);

            // If update is successful
            if (response.status === 200) {
                setSuccess('Details updated successfully!');
                setError('');

                // Dispatch updated user data to Redux
                dispatch(login.fulfilled(response.data));

                // Redirect to profile or dashboard
                setTimeout(() => {
                    navigate('/profile');
                }, 3000); // Redirect after 3 seconds
            }
        } catch (err) {
            // If there is an error, show the error message
            setError(err.response?.data?.message || 'Failed to update details. Please try again.');
            setSuccess('');
        }
    };

    return (
        <div className="edit-details-container p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Edit Your Details</h2>

            {/* Display success or error message */}
            {success && <div className="text-green-500 mb-4">{success}</div>}
            {error && <div className="text-red-500 mb-4">{error}</div>}

            {/* Edit Details Form */}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="fullname" className="block text-sm font-medium">Full Name</label>
                    <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        className="mt-2 p-2 w-full border rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="mt-2 p-2 w-full border rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-2 p-2 w-full border rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="college" className="block text-sm font-medium">College</label>
                    <select
                        id="college"
                        name="college"
                        value={formData.college}
                        onChange={handleChange}
                        className="mt-2 p-2 w-full border rounded-md"
                    >
                        <option value="">Select your College</option>
                        <option value="Vishwakarma Institute of Technology">Vishwakarma Institute of Technology</option>
                        <option value="MIT Pune">MIT Pune</option>
                        <option value="COEP">COEP</option>
                        <option value="Sinhgad College of Engineering">Sinhgad College of Engineering</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="course" className="block text-sm font-medium">Course</label>
                    <select
                        id="course"
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        className="mt-2 p-2 w-full border rounded-md"
                    >
                        <option value="">Select your Course</option>
                        <option value="Computer Engineering">Computer Engineering</option>
                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                        <option value="Civil Engineering">Civil Engineering</option>
                        <option value="Electronics and Telecommunication">Electronics and Telecommunication</option>
                        <option value="Information Technology">Information Technology</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="yearOfStudy" className="block text-sm font-medium">Year of Study</label>
                    <select
                        id="yearOfStudy"
                        name="yearOfStudy"
                        value={formData.yearOfStudy}
                        onChange={handleChange}
                        className="mt-2 p-2 w-full border rounded-md"
                    >
                        <option value="">Select your Year</option>
                        <option value="First Year">First Year</option>
                        <option value="Second Year">Second Year</option>
                        <option value="Third Year">Third Year</option>
                        <option value="Final Year">Final Year</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="avatar" className="block text-sm font-medium">Avatar</label>
                    <input
                        type="file"
                        id="avatar"
                        name="avatar"
                        onChange={handleFileChange}
                        className="mt-2 p-2 w-full border rounded-md"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600"
                >
                    Update Details
                </button>
            </form>
        </div>
    );
};

export default EditDetailsPage;
