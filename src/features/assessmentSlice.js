import { createSlice } from '@reduxjs/toolkit';

const assessmentSlice = createSlice({
    name: 'assessment',
    initialState: {
        details: [
            {
                _id: 1,
                userId: '12345',
                question: 'Tell us about yourself?',
                timeAllocated: 60,
                timeTaken: 50,
                videoLink: 'https://www.example.com/video1.mp4',
                originalText: 'Yesterday, I am going to the market and buys some vegetables. Later, I eats dinner and watches TV before go to bed.',
                correctedText: 'Yesterday, I went to the market and bought some vegetables. Later, I ate dinner and watched TV before going to bed.',
                grammarRating: 8,
                speakingRate: 120,
                pausePatterns: [1.5, 2.0, 1.0],
                fillerWords: ['um', 'uh'],
                pronunciationAssessment: {
                    wordClarity: 9,
                    phoneticAccuracy: 8,
                },
                fluencyMeasurement: {
                    speakingPace: 120,
                    clarityScore: 8.5,
                },
                assessmentScore: 85,
                feedback: {
                    grammarMistakes: 'Minor grammar mistakes.',
                    pronunciationErrors: 'Some words could be clearer.',
                    speakingPaceFeedback: 'Good pace overall.',
                    voiceClarityFeedback: 'Voice clarity is excellent.',
                },
                detectedLanguage: 'en-IN',
                reportGeneratedAt: '2024-12-11T10:00:00Z',
            },
            {
                _id: 2,
                userId: '67890',
                question: 'What’s your view on remote work culture?',
                timeAllocated: 60,
                timeTaken: 45,
                videoLink: 'https://www.example.com/video2.mp4',
                originalText: 'He go to school every day but forgets his books at home.',
                correctedText: 'He goes to school every day but forgets his books at home.',
                grammarRating: 9,
                speakingRate: 140,
                pausePatterns: [1.0, 1.5],
                fillerWords: ['like', 'you know'],
                pronunciationAssessment: {
                    wordClarity: 8.5,
                    phoneticAccuracy: 9,
                },
                fluencyMeasurement: {
                    speakingPace: 140,
                    clarityScore: 9,
                },
                assessmentScore: 90,
                feedback: {
                    grammarMistakes: 'Excellent grammar usage.',
                    pronunciationErrors: 'Few minor issues.',
                    speakingPaceFeedback: 'Speaking pace is very good.',
                    voiceClarityFeedback: 'Clear and concise voice.',
                },
                detectedLanguage: 'en-US',
                reportGeneratedAt: '2024-12-10T15:00:00Z',
            },
            {
                _id: 3,
                userId: '112233',
                question: 'How do you stay updated with industry trends?',
                timeAllocated: 60,
                timeTaken: 58,
                videoLink: 'https://www.example.com/video3.mp4',
                originalText: 'Yesterday, I am walking to the park when I sees a dog chasing a cat. The dog barks loudly, and the cat climbs a tree. I tries to help, but the cat don\'t come down. After some time, I decides to call someone for help. A man come and tells me to step aside. He climb the tree, but he falls before reaching the cat. Then, the cat jumps down on its own and runs away. Everyone laughs at the situation and go back to their own business. Later, I feels happy that the cat is safe and goes home to eats dinner.',
                correctedText: 'Yesterday, I was walking to the park when I saw a dog chasing a cat. The dog barked loudly, and the cat climbed a tree. I tried to help, but the cat didn’t come down. After some time, I decided to call someone for help. A man came and told me to step aside. He climbed the tree, but he fell before reaching the cat. Then, the cat jumped down on its own and ran away. Everyone laughed at the situation and went back to their own business. Later, I felt happy that the cat was safe and went home to eat dinner.',
                grammarRating: 7.5,
                speakingRate: 100,
                pausePatterns: [2.0, 2.5],
                fillerWords: ['uh', 'um', 'like'],
                pronunciationAssessment: {
                    wordClarity: 7,
                    phoneticAccuracy: 7.5,
                },
                fluencyMeasurement: {
                    speakingPace: 100,
                    clarityScore: 7.5,
                },
                assessmentScore: 75,
                feedback: {
                    grammarMistakes: 'Some minor grammatical issues.',
                    pronunciationErrors: 'Improvement needed in pronunciation.',
                    speakingPaceFeedback: 'Try to increase the pace slightly.',
                    voiceClarityFeedback: 'Voice clarity is decent but can be improved.',
                },
                detectedLanguage: 'en-IN',
                reportGeneratedAt: '2024-12-09T12:00:00Z',
            },
        ],
    },
    reducers: {
        setAssessmentDetails: (state, action) => {
            state.details = action.payload;
        },
    },
});

export const { setAssessmentDetails } = assessmentSlice.actions;
export default assessmentSlice.reducer;
