import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { FiArrowLeftCircle } from "react-icons/fi";
import axios from 'axios';
import api from "../api/index.js";

const COLORS = ['#43e175', '#f34b4b'];

const AssessmentDetails = () => {
    const { id } = useParams(); // Get the assessment ID from URL params
    const [assessment, setAssessment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log(id)

    useEffect(() => {
        const fetchAssessmentDetails = async () => {
            try {
                const response = await api.get(`/assessments/assessment/${id}`);
                // console.log(response.data.data)
                setAssessment(response.data.data); // Assuming 'data' contains the assessment
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch assessment data');
                setLoading(false);
            }
        };

        fetchAssessmentDetails();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500 font-semibold">{error}</p>;
    }

    if (!assessment) {
        return <p className="text-center text-red-500 font-semibold">Assessment not found</p>;
    }

    // Destructure assessment data
    const {
        question,
        timeAllocated,
        timeTaken,
        videoLink,
        originalText,
        correctedText,
        grammarRating,
        speakingRate,
        pause_pattern: pausePatterns,
        filler_word_usage: fillerWords,
        word_clarity: wordClarity,
        phonetic_accuracy: phoneticAccuracy,
        feedback,
        detectedLanguage,
        reportGeneratedAt,
    } = assessment;

    // Compare original and corrected text for differences
    const compareTexts = (original, corrected) => {
        const originalWords = original.split(' ');
        const correctedWords = corrected.split(' ');
        const maxLength = Math.max(originalWords.length, correctedWords.length);

        const highlightedOriginal = originalWords.map((word, index) => (
            <span
                key={`original-${index}`}
                className={word !== correctedWords[index] ? "text-red-500 bg-red-100" : ""}
            >
                {word}{' '}
            </span>
        ));

        const highlightedCorrected = correctedWords.map((word, index) => (
            <span
                key={`corrected-${index}`}
                className={word !== originalWords[index] ? "text-green-500 bg-green-100" : ""}
            >
                {word}{' '}
            </span>
        ));

        return { highlightedOriginal, highlightedCorrected };
    };

    const { highlightedOriginal, highlightedCorrected } = compareTexts(originalText, correctedText);

    return (
        <div className="p-10 flex flex-col gap-12">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <FiArrowLeftCircle
                        size={25}
                        className="hover:cursor-pointer"
                        onClick={() => window.history.back()}
                    />
                    <h1 className="text-xl font-semibold">Assessment Report</h1>
                </div>
                <p>Generated At: {reportGeneratedAt}</p>
            </div>

            {/* Question and Video Section */}
            <div className="flex gap-8">
                <div className="w-1/2">
                    <h2 className="text-lg font-semibold">Question</h2>
                    <p className="text-4xl mb-4">{question}</p>
                    {/*<div>*/}
                    {/*    <h3>{`Time Taken: ${timeTaken}s / Time Allocated: ${timeAllocated}s`}</h3>*/}
                    {/*    <div className="bg-gray-300 h-1 w-full">*/}
                    {/*        <div*/}
                    {/*            className="bg-green-500 h-full"*/}
                    {/*            style={{ width: `${(timeTaken / timeAllocated) * 100}%` }}*/}
                    {/*        ></div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
                <div className="w-1/2">
                    <h2 className="text-lg font-semibold">Response Video</h2>
                    <ReactPlayer url={videoLink} controls className="w-full h-auto" />
                </div>
            </div>

            {/* Grammar Check */}
            <div>
                <h2 className="text-xl font-semibold">Grammar Check</h2>
                <div className="flex gap-8">
                    <div className="w-1/2">
                        <h3 className="text-lg font-semibold">Original Text</h3>
                        <p>{highlightedOriginal}</p>
                    </div>
                    <div className="w-1/2">
                        <h3 className="text-lg font-semibold">Corrected Text</h3>
                        <p>{highlightedCorrected}</p>
                    </div>
                </div>
            </div>

            {/* Performance Metrics */}
            <div className="flex gap-8">
                <div className="w-1/2">
                    <h2 className="text-xl font-semibold">Grammar Rating</h2>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={[
                                    { name: "Correct", value: grammarRating },
                                    { name: "Incorrect", value: 100 - grammarRating },
                                ]}
                                cx="50%"
                                cy="50%"
                                innerRadius="40%"
                                outerRadius="70%"
                                fill="#8884d8"
                                paddingAngle={5}
                            >
                                {['Correct', 'Incorrect'].map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="w-1/2">
                    <h2 className="text-xl font-semibold">Additional Metrics</h2>
                    <p><strong>Speaking Rate:</strong> {speakingRate} words/min</p>
                    <p><strong>Pause Patterns:</strong> {pausePatterns.join(', ')} seconds</p>
                    <p><strong>Filler Words:</strong> {fillerWords}</p>
                    <p><strong>Word Clarity:</strong> {wordClarity}%</p>
                    <p><strong>Phonetic Accuracy:</strong> {phoneticAccuracy}%</p>
                    <p><strong>Detected Language:</strong> {detectedLanguage}</p>
                </div>
            </div>

            {/* Feedback */}
            <div>
                <h2 className="text-xl font-semibold">Feedback</h2>
                <ul className="list-disc ml-6">
                    {feedback.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AssessmentDetails;
