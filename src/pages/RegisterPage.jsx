import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate();

    // State to handle form input values
    const [formData, setFormData] = useState({
        fullname: '',
        username: '',
        email: '',
        password: '',
        college: '',
        course: '',
        yearOfStudy: '',
        role: 'Student',
        country: '',
        state: '',
        avatar: null, // Handle file input for avatar
    });

    // State to handle error/success messages
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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

        // Prepare form data for file upload
        const form = new FormData();
        for (const key in formData) {
            form.append(key, formData[key]);
        }

        try {
            // Send registration request to the server
            const response = await axios.post('http://localhost:3000/api/v1/users/register', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // If registration is successful
            if (response.status === 201) {
                setSuccess('Registration successful! Redirecting to login...');
                setError('');

                // Redirect to login page after success
                setTimeout(() => {
                    navigate('/login');
                }, 3000); // Redirect after 3 seconds
            }
        } catch (err) {
            // If there is an error, show the error message
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
            setSuccess('');
        }
    };

    return (
        <div className="registration-container p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Register</h2>

            {/* Display success or error message */}
            {success && <div className="text-green-500 mb-4">{success}</div>}
            {error && <div className="text-red-500 mb-4">{error}</div>}

            {/* Registration Form */}
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
                    <label htmlFor="password" className="block text-sm font-medium">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
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
                        required
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
                        required
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
                        required
                    >
                        <option value="">Select your Year</option>
                        <option value="First Year">First Year</option>
                        <option value="Second Year">Second Year</option>
                        <option value="Third Year">Third Year</option>
                        <option value="Final Year">Final Year</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="role" className="block text-sm font-medium">Role</label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="mt-2 p-2 w-full border rounded-md"
                    >
                        <option value="Student">Student</option>
                        <option value="Faculty">Faculty</option>
                        <option value="Administrator">Administrator</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="country" className="block text-sm font-medium">Country</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="mt-2 p-2 w-full border rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="state" className="block text-sm font-medium">State</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="mt-2 p-2 w-full border rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="avatar" className="block text-sm font-medium">Avatar</label>
                    <input
                        type="file"
                        id="avatar"
                        name="avatar"
                        onChange={handleFileChange}
                        className="mt-2 p-2 w-full border rounded-md"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
