import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/PluginLiveLogo.png";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../features/authSlice.js";

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Access authentication state
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);

    const dropdownRef = useRef(null);
    const avatarRef = useRef(null);

    const handleLogout = () => {
        // Dispatch logout and redirect to login
        dispatch(logoutThunk());
        navigate("/login");
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !avatarRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <nav id="navbar">
            <img src={logo} className="logo" alt="Logo" />
            <div className="navDiv">
                {isAuthenticated ? (
                    <div className="user-icon-container" ref={avatarRef}>
                        <img
                            src={user?.avatar || "https://via.placeholder.com/45"}
                            alt="User Avatar"
                            className="rounded-full w-[45px] h-[45px] cursor-pointer"
                            onClick={toggleDropdown}
                        />
                        {dropdownOpen && (
                            <div ref={dropdownRef} className="dropdown-menu">
                                <button onClick={() => navigate("/profile")}>My Profile</button>
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        className="login-btn"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
