import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const VideoRecording = () => {
    const [countdown, setCountdown] = useState(3); // Countdown before recording starts
    const [recordingTimeLeft, setRecordingTimeLeft] = useState(5); // Recording time countdown
    const [isRecording, setIsRecording] = useState(false); // Track if recording is in progress
    const [videoStream, setVideoStream] = useState(null); // Video stream from camera
    const [mediaRecorder, setMediaRecorder] = useState(null); // MediaRecorder instance
    const [videoBlob, setVideoBlob] = useState(null); // Store recorded video blob
    const [videoUrl, setVideoUrl] = useState(null); // URL for downloading the video
    const [postRecordingWait, setPostRecordingWait] = useState(false); // 15-second wait flag

    const videoRef = useRef(null); // Ref for video element
    const timerRef = useRef(null); // Ref for recording timer
    const navigate = useNavigate();
    useEffect(() => {
        // Access camera and microphone
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                setVideoStream(stream);
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
            .catch((error) => {
                console.error("Error accessing media devices:", error);
            });

        return () => {
            stopMediaTracks(); // Stop tracks when component unmounts
        };
    }, []);

    useEffect(() => {
        // Handle countdown before starting recording
        if (countdown > 0) {
            const countdownInterval = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
            return () => clearInterval(countdownInterval);
        } else if (countdown === 0) {
            startVideoRecording();
        }
    }, [countdown]);

    useEffect(() => {
        // Timer for recording
        if (isRecording && recordingTimeLeft > 0) {
            timerRef.current = setInterval(() => {
                setRecordingTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (recordingTimeLeft === 0) {
            stopVideoRecording();
        }

        return () => clearInterval(timerRef.current);
    }, [isRecording, recordingTimeLeft]);

    useEffect(() => {
        // Redirect to Dashboard after 15 seconds post-recording wait
        if (postRecordingWait) {
            const timeout = setTimeout(() => {
                window.location.href = "/dashboard"; // Redirect to Dashboard
            }, 1500000);
            return () => clearTimeout(timeout);
        }
    }, [postRecordingWait]);

    const startVideoRecording = () => {
        setIsRecording(true);

        // Enable fullscreen mode
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        }

        const recorder = new MediaRecorder(videoStream);
        setMediaRecorder(recorder);

        const chunks = [];
        recorder.ondataavailable = (event) => {
            chunks.push(event.data);
        };

        recorder.onstop = () => {
            const blob = new Blob(chunks, { type: "video/webm" });
            setVideoBlob(blob);
            const videoURL = URL.createObjectURL(blob);
            setVideoUrl(videoURL);
        };

        recorder.start();
    };

    const stopVideoRecording = () => {
        setIsRecording(false);
        if (mediaRecorder) {
            mediaRecorder.stop();
        }
        stopMediaTracks(); // Stop camera and mic immediately
        setPostRecordingWait(true);
        // Exit fullscreen mode
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    };

    const stopMediaTracks = () => {
        if (videoStream) {
            videoStream.getTracks().forEach((track) => track.stop());
        }
        setVideoStream(null);
    };

    const handleDownloadVideo = () => {
        if (videoUrl) {
            const link = document.createElement("a");
            link.href = videoUrl;
            link.download = "recorded-video.webm";
            link.click();
        }
    };

    const handleExit = () => {
        navigate("/"); // Redirect the user to the home page or another safe page
    };


    return (
        <div className="video-recording-container bg-black text-white w-screen h-[90vh] overflow-hidden flex flex-col justify-center items-center">
            {/* Video preview section */}
            <div className="video-container flex items-center justify-center w-full h-[80vh] bg-black">
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className="object-cover rounded-md"
                ></video>

                {/* Countdown before starting recording */}
                {!isRecording && countdown > 0 && (
                    <div className="absolute text-center text-5xl font-bold text-white">
                        Starting in {countdown}...
                    </div>
                )}
            </div>

            {/* Basebar */}
            <div className="basebar bg-gray-900 w-full h-[10vh] flex items-center justify-between px-6">
                <div className="timer text-xl font-semibold">
                    Time Remaining: {isRecording ? `${recordingTimeLeft}s` : "--"}
                </div>
                {isRecording && (
                    <button
                        className="stop-assessment-btn py-2 px-6 bg-red-600 text-white font-semibold rounded hover:bg-red-700"
                        onClick={stopVideoRecording}
                    >
                        Stop
                    </button>
                )}
            </div>

            {/* Download button */}
            {!isRecording && videoUrl && (
                <div className="absolute bottom-20 flex gap-5 left-1/2 transform -translate-x-1/2">
                    <button
                        className="download-video-btn py-2 mb-4 px-6 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
                        onClick={handleExit}
                    >
                        Go To Dashboard
                    </button>
                    <button
                        className="download-video-btn py-2 mb-4 px-6 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
                        onClick={handleDownloadVideo}
                    >
                        Download Video
                    </button>
                </div>
            )}

            {/* Post-recording message */}
            {postRecordingWait && (
                <div className="absolute text-center text-2xl font-bold">
                    Processing completed. Redirecting to Dashboard in 15 seconds...
                </div>
            )}
        </div>
    );
};

export default VideoRecording;
