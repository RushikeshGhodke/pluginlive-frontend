import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importing useNavigate for page redirection

const Assessment = () => {
    const [timer, setTimer] = useState(5); // Timer for reading the question
    const [isAssessmentStarted, setIsAssessmentStarted] = useState(false); // Track if assessment started
    const navigate = useNavigate(); // Hook to navigate between pages

    const questions = [
        "Tell us about yourself?",
        "What’s your view on remote work culture?",
        "How do you stay updated with industry trends?",
        "What inspired you to choose your career path?",
    ];

    const question = questions[0]; // Display only one question for now

    useEffect(() => {
        // Start timer for reading question
        if (timer > 0 && !isAssessmentStarted) {
            const timerId = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
            return () => clearInterval(timerId);
        }
    }, [timer, isAssessmentStarted]);

    const startRecording = () => {
        setIsAssessmentStarted(true); // Mark the assessment as started
        navigate("/record"); // Redirect to the video recording page
    };

    const handleExit = () => {
        navigate("/"); // Redirect the user to the home page or another safe page
    };

    return (
        <div
            className="assessment-container bg-black text-white p-8 text-center flex justify-center items-center h-screen">
            <div className="assessment-content">
                {!isAssessmentStarted ? (
                    <>
                        <h1 className="text-3xl font-semibold">{question}</h1>
                        <div className="mt-4">
                            <p>Reading Time: {timer} seconds left</p>
                        </div>

                        <button
                            className="continue-btn mt-4 py-2 px-6 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
                            onClick={startRecording}
                        >
                            Continue
                        </button>

                    </>
                ) : (
                    <div>
                        <h1 className="text-3xl font-semibold">Please wait...</h1>
                    </div>
                )}
                {/* Exit Button */}
                <button
                    className="exit-btn mt-4 py-2 px-6 bg-red-600 text-white font-semibold rounded hover:bg-red-700"
                    onClick={handleExit}
                >
                    Exit
                </button>
            </div>
        </div>
    );
};

export default Assessment;
