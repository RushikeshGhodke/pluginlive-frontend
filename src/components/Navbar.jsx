import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/PluginLiveLogo.png";
import arrow from "../assets/arrow.png";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../features/authSlice.js";
import { FiAlignLeft, FiUser } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import { FiClock } from "react-icons/fi";


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
            <img src={logo} onClick={() => navigate("/")} className="logo hover:cursor-pointer" alt="Logo" />
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
                            <div ref={dropdownRef} className="dropdown-menu bg-white shadow-md rounded-md p-2">
                                <button
                                    onClick={() => navigate("/profile")}
                                    className={`flex items-center justify-start gap-3`}
                                >
                                    <FiUser className={`ml-3`} /> My Profile
                                </button>
                                {/*<button*/}
                                {/*    onClick={() => navigate("/history")}*/}
                                {/*    className={`flex items-center justify-start gap-3`}*/}
                                {/*>*/}
                                {/*    <FiClock className={`ml-3`} /> History*/}
                                {/*</button>*/}
                                <button
                                    onClick={() => navigate("/dashboard")}
                                    className={`flex items-center justify-start gap-3`}
                                >
                                    <FiAlignLeft className={`ml-3`} /> Dashboard
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className={`flex items-center justify-start gap-3`}
                                >
                                    <FiLogOut className={`ml-3`} /> Logout
                                </button>
                            </div>
                        )}

                    </div>
                ) : (
                    <button
                        className="login-btn uppercase flex font-semibold"
                        onClick={() => navigate("/login")}
                    >
                        Sign In <img src={arrow} className={`pl-2 h-6`}/>
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
