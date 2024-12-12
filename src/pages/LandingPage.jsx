import React from "react";
import search from "../assets/search.png"
import personalizedLearning from "../assets/personalizedLearning.png"
import realTimeMonitoring from "../assets/realTimeMonitoring.png"
import scalability from "../assets/scalability.png"
import { Link, useNavigate } from "react-router-dom";

const LandingPage = () => {

    const navigate = useNavigate();

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <header className="h-[90vh] flex flex-col items-center justify-center gap-3">
                <h1 className="text-5xl flex flex-col gap-3"><span>Revolutionize Learning</span> <span>with AI-Driven Insights</span>
                </h1>
                <p className="mt-4 text-2xl">
                    Unlock personalized learning paths, real-time feedback, and smarter assessments.
                </p>
                <div className="mt-6">
                    <button
                        onClick={() => navigate("/login")}
                        className="text-white bg-[#073CA5] px-6 py-4 rounded-full shadow-md">
                        Get Started for Free
                    </button>
                    <Link to="https://pluginlive.com" target="_blank" className="ml-4 bg-white px-6 py-4 rounded-full text-[#073CA5] border border-[#073CA5]">
                        Learn More
                    </Link>

                </div>
            </header>

            {/* Features Section */}
            <section className="py-16 px-24">
                <h2 className="text-4xl font-semibold text-center">Why Choose Our Platform?</h2>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <FeatureCard
                        title="Smart Assessments"
                        description="AI-powered evaluations for precise and unbiased results."
                        image={search}
                    />
                    <FeatureCard
                        title="Personalized Learning"
                        description="Tailored suggestions to help learners improve efficiently."
                        image={personalizedLearning}
                    />
                    <FeatureCard
                        title="Real-Time Analytics"
                        description="Actionable insights for educators and students."
                        image={realTimeMonitoring}
                    />
                    <FeatureCard
                        title="Scalable Solutions"
                        description="Built to grow with your needs, whether for a classroom or an institution."
                        image={scalability}
                    />
                </div>
            </section>

            {/* How It Works Section */}
            <section className="bg-gray-100 py-16 px-24">
                <h2 className="text-4xl font-semibold text-center">How It Works</h2>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StepCard step="1" title="Upload or Create Tests" />
                    <StepCard step="2" title="Automated AI Grading" />
                    <StepCard step="3" title="Receive Actionable Insights" />
                    <StepCard step="4" title="Track Progress Over Time" />
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 px-24">
                <h2 className="text-3xl font-semibold text-center">What Our Users Say</h2>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Testimonial
                        quote="This has completely transformed the way I grade candidates, saving me hours of tedious work!"
                        author="Rushikesh Ghodke, Founder"
                    />
                    <Testimonial
                        quote="This platform has completely transformed how we evaluate students. The AI feedback is spot-on!"
                        author="Dr. Priya Sharma, Educator"
                    />
                    <Testimonial
                        quote="I saved hours of manual grading, and my students love the personalized feedback!"
                        author="Rahul Verma, Teacher"
                    />
                </div>
            </section>

            {/* CTA Section and Footer */}
            <footer className="bg-gradient-to-b from-[#073ca5] to-[#09093f] rounded-t-[50px] flex flex-col gap-10 font-plus-jakarta-sans h-max justify-center w-full text-white py-16 text-center">
                <section
                    className="">
                    <h2 className="text-3xl font-semibold">Ready to Transform Learning?</h2>
                    <p className="mt-4">Experience the future of assessments today.</p>
                    <button className="mt-6 text-[#1A1A82] bg-white px-6 py-2 rounded-full shadow-md hover:bg-gray-100">
                        Sign Up Now
                    </button>
                </section>

                <p>&copy; 2024 AI Assessment Platform. All rights reserved.</p>
                <div className="mt-4 flex justify-center gap-4">
                    <a href="#" className="hover:underline">Privacy Policy</a>
                    <a href="#" className="hover:underline">Terms of Service</a>
                    <a href="#" className="hover:underline">Contact</a>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ title, description, image, imgClassName, classes }) => (
    <div
        className={`p-6 border rounded-lg shadow-md text-center flex flex-col gap-2 items-center ${classes} 
                    transition-transform transform hover:scale-105`}
    >
        <img alt={'image'} src={image} className={`w-16 mb-3 ${imgClassName}`}/>
        <h3 className="font-semibold text-xl">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const StepCard = ({ step, title }) => (
    <div className="p-6 border rounded-lg shadow-md text-center">
        <span className="text-blue-600 font-semibold text-2xl">{step}</span>
        <h3 className="font-semibold text-xl mt-2">{title}</h3>
    </div>
);

const Testimonial = ({ quote, author }) => (
    <div className="p-6 border rounded-lg shadow-md">
        <p className="italic text-gray-700">"{quote}"</p>
        <p className="text-right mt-4 font-semibold text-blue-600">{author}</p>
    </div>
);

export default LandingPage;
