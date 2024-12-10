import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
    // Getting user data from Redux state
    const user = useSelector((state) => state.auth.user);

    return (
        <div className="profile-container px-6 py-8">
            <h1 className="text-4xl font-bold">Profile</h1>

            {/* Displaying user avatar */}
            <div className="avatar mt-4 flex items-center space-x-4">
                <img
                    src={user?.avatar}
                    alt="User Avatar"
                    className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                    <h2 className="text-2xl font-semibold">{user?.fullname}</h2>
                    <p className="text-lg text-gray-500">{user?.role}</p>
                </div>
            </div>

            <div className="user-details mt-8 space-y-4">
                <div>
                    <strong>Email:</strong> <span>{user?.email}</span>
                </div>
                <div>
                    <strong>College:</strong> <span>{user?.college}</span>
                </div>
                <div>
                    <strong>Course:</strong> <span>{user?.course}</span>
                </div>
                <div>
                    <strong>Year of Study:</strong> <span>{user?.yearOfStudy}</span>
                </div>
                <div>
                    <strong>Country:</strong> <span>{user?.country}</span>
                </div>
                <div>
                    <strong>State:</strong> <span>{user?.state}</span>
                </div>
            </div>

            <div className="created-at mt-6">
                <strong>Account Created:</strong> <span>{new Date(user?.createdAt).toLocaleDateString()}</span>
            </div>
        </div>
    );
};

export default Profile;
