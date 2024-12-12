import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api/index.js";

const Dashboard = () => {
    const navigate = useNavigate();
    const userId = useSelector((state) => state.auth.user?._id); // Get user ID from Redux
    const userName = useSelector((state) => state.auth.user?.fullname); // Get user name from Redux

    const [assessments, setAssessments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [isTnCAccepted, setIsTnCAccepted] = useState(false);
    const [canStart, setCanStart] = useState(false);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasMicPermission, setHasMicPermission] = useState(null);

    // Fetch assessments on component mount
    useEffect(() => {
        const fetchAssessments = async () => {
            if (!userId) return; // Exit if user ID is not available

            try {
                const response = await api.post("/assessments/getAssessments", {
                    userId, // Send userId in the request body
                });
                console.log(response.data.data);
                setAssessments(response.data.data);
            } catch (err) {
                setError("Failed to fetch assessments.");
            } finally {
                setLoading(false);
            }
        };

        fetchAssessments();
    }, [userId]);

    const handleTnCChange = (e) => {
        const value = e.target.value.trim().toLowerCase();
        setIsTnCAccepted(value === "start");
        setCanStart(value === "start");
    };

    const requestPermissions = () => {
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                setHasCameraPermission(true);
                setHasMicPermission(true);
                stream.getTracks().forEach((track) => track.stop());
            })
            .catch(() => {
                setHasCameraPermission(false);
                setHasMicPermission(false);
            });

        setShowModal(true);
    };

    const handleStartAssessment = () => {
        // if (canStart && hasCameraPermission && hasMicPermission) {
            navigate(`http://localhost:5000/${userId}`);
        // }
    };

    const handleAssessmentClick = (assessmentId) => {
        navigate(`/assessment/${assessmentId}`);
    };

    return (
        <div className="dashboard-container px-24 py-8">
            <div className="flex flex-row items-center justify-between mb-8">
                <h1 className="text-4xl font-bold">
                    Welcome, {userName ? userName : "Guest"}!
                </h1>

                <button
                    className="start-assessment-btn py-2 px-6 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
                    onClick={requestPermissions}
                >
                    Start New Assessment
                </button>
            </div>

            <div className="h-[2px] bg-gray-300 w-full"></div>

            <div className="dashboard-content mt-6">
                <h2 className="text-2xl font-semibold">Previous Assessments</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : assessments.length > 0 ? (
                    <ul>
                        {assessments.map((assessment) => (
                            <li
                                key={assessment._id}
                                onClick={() => handleAssessmentClick(assessment._id)}
                                className="assessment-item cursor-pointer p-2 hover:bg-gray-100"
                            >
                                <p>{assessment.question}</p>
                                {/*<p>{`Date: ${new Date(*/}
                                {/*    assessment.reportGeneratedAt*/}
                                {/*).toLocaleDateString()}`}</p>*/}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No previous assessments found.</p>
                )}
            </div>

            {showModal && (
                <div className="modal-overlay fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="modal-content bg-white p-6 rounded-lg w-96">
                        <h3 className="text-xl font-semibold">Start Your Assessment</h3>
                        <p>Please grant access to your microphone and camera.</p>
                        <div className="mt-4">
                            <p>
                                Camera Permission:{" "}
                                {hasCameraPermission ? "Granted" : "Not Granted"}
                            </p>
                            <p>
                                Mic Permission:{" "}
                                {hasMicPermission ? "Granted" : "Not Granted"}
                            </p>
                        </div>

                        <div className="mt-6">
                            <input
                                type="text"
                                placeholder="Type 'start' to begin"
                                onChange={handleTnCChange}
                                className="mt-2 px-4 py-2 border border-gray-300 rounded"
                            />
                        </div>

                        <div className="mt-4 flex justify-between">
                            <button
                                className="cancel-btn py-2 px-4 bg-gray-400 text-white rounded hover:bg-gray-500"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className={`start-btn py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 ${
                                    canStart && hasCameraPermission && hasMicPermission
                                        ? ""
                                        : "opacity-50 cursor-not-allowed"
                                }`}
                                onClick={handleStartAssessment}
                                disabled={
                                    !canStart || !hasCameraPermission || !hasMicPermission
                                }
                            >
                                Start
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
