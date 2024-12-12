import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { FiArrowLeftCircle } from "react-icons/fi";

// Define the colors for the pie chart segments
const COLORS = ['#43e175', '#f34b4b'];

const AssessmentDetails = () => {
    const { id } = useParams(); // Get the assessment ID from URL params

    const assessmentId = id;

    // Fetch all assessments from Redux store
    const allAssessments = useSelector((state) => state.assessment.details);
    console.log(allAssessments);
    // Find the specific assessment using the assessmentId
    const assessment = allAssessments.find((item) => parseInt(item._id) === parseInt(assessmentId));
    console.log(assessment);
    if (!assessment) {
        return <p>Assessment not found</p>;
    }

    console.log(assessment)

    const {
        question,
        timeAllocated,
        timeTaken,
        videoLink,
        originalText,
        correctedText,
        grammarRating,
        speakingRate,
        pausePatterns,
        fillerWords,
        pronunciationAssessment,
        fluencyMeasurement,
        assessmentScore,
        detectedLanguage,
        feedback,
        reportGeneratedAt,
    } = assessment;

    console.log(correctedText, originalText)

    // Function to highlight differences between original and corrected text
    const highlightText = (original, corrected) => {
        const originalWords = original.split(' ');
        const correctedWords = corrected.split(' ');

        return originalWords.map((word, index) => {
            const correctedWord = correctedWords[index] || '';
            const isCorrected = word !== correctedWord;
            return (
                <span
                    key={index}
                    className={`${isCorrected ? 'text-red-500 bg-red-100' : 'text-black'}`}
                >
          {word}{' '}
        </span>
            );
        });
    };

    const compareTexts = (original, corrected) => {
        const originalWords = original.split(' ');
        const correctedWords = corrected.split(' ');

        const mismatches = []; // To store indexes of mismatched words
        const maxLength = Math.max(originalWords.length, correctedWords.length);

        // Find mismatched word indexes
        for (let i = 0; i < maxLength; i++) {
            if (originalWords[i] !== correctedWords[i]) {
                mismatches.push(i);
            }
        }

        // Highlight original and corrected text
        const highlightedOriginal = originalWords.map((word, index) =>
            mismatches.includes(index) ? (
                <span key={`original-${index}`} className="text-red-500 bg-red-100">
                {word}{' '}
            </span>
            ) : (
                <span key={`original-${index}`} className="text-black">
                {word}{' '}
            </span>
            )
        );

        const highlightedCorrected = correctedWords.map((word, index) =>
            mismatches.includes(index) ? (
                <span key={`corrected-${index}`} className="text-green-500 bg-green-100">
                {word}{' '}
            </span>
            ) : (
                <span key={`corrected-${index}`} className="text-black">
                {word}{' '}
            </span>
            )
        );

        return { highlightedOriginal, highlightedCorrected };
    };


    const { highlightedOriginal, highlightedCorrected } = compareTexts(originalText, correctedText);


    return (
        <div className="p-10 flex flex-col gap-12">

            <div className="flex justify-between">
                <div className="flex items-center gap-4">
                    <FiArrowLeftCircle size={25} className={`hover:cursor-pointer`} onClick={() => history.back()} />
                    <h1>Assessment Report</h1>
                </div>
                <p>Generated At - {reportGeneratedAt}</p>
            </div>

            {/* First Part - Question and Video Section */}
            <div className="flex items-center justify-between gap-3 h-max">
                <div className="flex flex-col items-start mr-8 w-1/2 max-h-full">
                    <h2 className="text-lg font-semibold">Question</h2>
                    <div className="flex flex-col justify-between w-full h-[350px]">
                        <p className="mb-4 text-4xl">{question}</p>
                        <div className="mt-4">
                            <h3 className="text-lg font-medium">{`Time Taken: ${timeTaken}s / Time Allocated: ${timeAllocated}s`}</h3>
                            <div className="bg-gray-300 h-1 w-full">
                                <div
                                    className="bg-green-500 h-full"
                                    style={{ width: `${(timeTaken / timeAllocated) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-1/2">
                    <h2 className="text-lg font-semibold">Response Video</h2>
                    <ReactPlayer url={`https://youtu.be/-hK3co5D4VU?si=S-ZkNxyRPSSWqBc4`} controls
                                 className="w-auto h-auto" />
                </div>
            </div>

            <div className={`h-[2px] bg-gray-300 w-full`}></div>

            {/* Second Part - Original and Corrected Text Comparison */}
            <div>
                <h1 className="text-xl font-semibold mb-2">Grammer Check</h1>
                <div>
                    <div className="flex flex-row mb-6 gap-10">
                        <div className="flex-1 mr-8">
                            <h2 className="text-lg font-semibold">Original Text</h2>
                            <p>{highlightedOriginal}</p>
                        </div>
                        <div className={`h-[100px] bg-gray-300 w-[2px]`}></div>
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold">Corrected Text</h2>
                            <p>{highlightedCorrected}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`h-[2px] bg-gray-300 w-full`}></div>

            {/* Third Part - Performance Metrics */}
            <div className="flex">
                <div className="flex-1 mr-8">
                    <h2 className="text-xl font-semibold mb-2">Grammar Rating</h2>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={[
                                    { name: "Correct", value: grammarRating },
                                    { name: 'Incorrect', value: 10 - grammarRating },
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
                <div className="flex-1">
                    <h2 className="text-xl font-semibold">Speaking Rate</h2>
                    <div className="flex gap-2">
                        <p className="mb-4">{<span
                            className="text-xl font-semibold">{speakingRate}</span>} words/min</p>
                        <p>-</p>
                        <p className="text-lg">
                            {speakingRate < 80 ? "Slow" : speakingRate < 120 ? "Good" : "Fast"}
                        </p>
                    </div>

                    <h2 className="text-xl font-semibold">Pause Patterns</h2>
                    <p className="mb-4">{pausePatterns.join(", ")}s</p>

                    <h2 className="text-xl font-semibold">Filler Words</h2>
                    <p>{fillerWords.join(', ')}</p>
                </div>
            </div>

            <div className={`h-[2px] bg-gray-300 w-full`}></div>

            {/* Fourth Part: Additional Assessment Metrics */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold">Additional Assessment Metrics</h2>
                <p><strong>Pronunciation Assessment:</strong></p>
                <div className="ml-4">
                    <p><strong>Word Clarity:</strong> {pronunciationAssessment.wordClarity}</p>
                    <p><strong>Phonetic Accuracy:</strong> {pronunciationAssessment.phoneticAccuracy}</p>
                </div>

                <p><strong>Fluency Measurement:</strong></p>
                <div className="ml-4">
                    <p><strong>Speaking Pace:</strong> {fluencyMeasurement.speakingPace} words/min</p>
                    <p><strong>Clarity Score:</strong> {fluencyMeasurement.clarityScore}</p>
                </div>

                <p><strong>Assessment Score:</strong> {assessmentScore}</p>
                <p><strong>Detected Language:</strong> {detectedLanguage}</p>
            </div>

            <div className={`h-[2px] bg-gray-300 w-full`}></div>

            {/* Fifth Part: Feedback */}
            <div>
                <h2 className="text-xl font-semibold mb-2">Feedback</h2>
                <p><strong>Grammar:</strong> {feedback.grammarMistakes}</p>
                <p><strong>Pronunciation:</strong> {feedback.pronunciationErrors}</p>
                <p><strong>Speaking Pace:</strong> {feedback.speakingPaceFeedback}</p>
                <p><strong>Voice Clarity:</strong> {feedback.voiceClarityFeedback}</p>
            </div>
        </div>
    );
};

export default AssessmentDetails;
