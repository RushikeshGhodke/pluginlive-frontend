import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ProtectedRoute from './PrivateRoute.jsx';
import Layout from "./Layout.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Profile from "./pages/Profile.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import VerifyOTP from "./pages/VerifyOTP.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

const App = () => {
    return (
        <Router>
            <Routes>

                <Route element={<Layout/>}>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/forgot" element={<ForgotPassword />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/verify-otp" element={<VerifyOTP />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                </Route>

            </Routes>
        </Router>
    );
};

export default App;



// import React, {useEffect} from 'react';
// import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
// import Layout from './Layout';
// import Dashboard from './pages/Dashboard.jsx'
//
// const App = () => {
//     return (
//         <>
//             <Router>
//                 <Routes>
//                     {/* Public Route */}
//                     <Route element={<Layout/>}>
//                     <Route path="/" element={<Dashboard/>}/>
//                     {/* <Route path="/login" element={isLoggedIn ? <Navigate to="/"/> : <Login/>}/> */}
//
//                     {/* Private Routes */}
//                     {/* <Route element={<PrivateRoute/>}>
//                         <Route element={<Layout/>}>
//                             <Route path="/" element={<Home/>}/>
//                             <Route path="/employees" element={<EmployeeDashboard/>}/>
//                             <Route path="/departments" element={<DepartmentDashboard/>}/>
//                             <Route path="/department/addDepartment" element={<AddDepartment/>}/>
//                             <Route path="/department/:id" element={<DepartmentProfile/>}/>
//                             <Route path="/employee/:id" element={<EmployeeProfile/>}/>
//                             <Route path="/employee/addEmployee" element={<AddEmployee/>}/>
//                             <Route path="/employee/edit/:id" element={<EditEmployeePage/>}/>
//                         </Route>
//                     </Route> */}
//
//                     {/* Fallback for undefined routes */}
//                     {/* <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"}/>}/> */}
//                     </Route>
//                 </Routes>
//             </Router>
//         </>
//     );
// };
//
// export default App;
