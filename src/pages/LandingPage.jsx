import React from "react";

const LandingPage = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <header className="bg-blue-600 text-white py-16 text-center">
                <h1 className="text-4xl font-bold">Revolutionize Learning with AI-Driven Insights</h1>
                <p className="mt-4 text-lg">
                    Unlock personalized learning paths, real-time feedback, and smarter assessments.
                </p>
                <div className="mt-6">
                    <button className="bg-white text-blue-600 px-6 py-2 rounded-lg shadow-md hover:bg-gray-100">
                        Get Started for Free
                    </button>
                    <button className="ml-4 bg-blue-700 px-6 py-2 rounded-lg hover:bg-blue-800">
                        Learn More
                    </button>
                </div>
            </header>

            {/* Features Section */}
            <section className="py-16 px-6">
                <h2 className="text-3xl font-bold text-center">Why Choose Our Platform?</h2>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <FeatureCard
                        title="Smart Assessments"
                        description="AI-powered evaluations for precise and unbiased results."
                    />
                    <FeatureCard
                        title="Personalized Learning"
                        description="Tailored suggestions to help learners improve efficiently."
                    />
                    <FeatureCard
                        title="Real-Time Analytics"
                        description="Actionable insights for educators and students."
                    />
                    <FeatureCard
                        title="Scalable Solutions"
                        description="Built to grow with your needs, whether for a classroom or an institution."
                    />
                </div>
            </section>

            {/* How It Works Section */}
            <section className="bg-gray-100 py-16 px-6">
                <h2 className="text-3xl font-bold text-center">How It Works</h2>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StepCard step="1" title="Upload or Create Tests" />
                    <StepCard step="2" title="Automated AI Grading" />
                    <StepCard step="3" title="Receive Actionable Insights" />
                    <StepCard step="4" title="Track Progress Over Time" />
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 px-6">
                <h2 className="text-3xl font-bold text-center">What Our Users Say</h2>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
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

            {/* CTA Section */}
            <section className="bg-blue-600 text-white py-16 text-center">
                <h2 className="text-3xl font-bold">Ready to Transform Learning?</h2>
                <p className="mt-4">Experience the future of assessments today.</p>
                <button className="mt-6 bg-white text-blue-600 px-6 py-2 rounded-lg shadow-md hover:bg-gray-100">
                    Sign Up Now
                </button>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8 text-center">
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

const FeatureCard = ({ title, description }) => (
    <div className="p-6 border rounded-lg shadow-md text-center">
        <h3 className="font-bold text-xl mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const StepCard = ({ step, title }) => (
    <div className="p-6 border rounded-lg shadow-md text-center">
        <span className="text-blue-600 font-bold text-2xl">{step}</span>
        <h3 className="font-bold text-lg mt-2">{title}</h3>
    </div>
);

const Testimonial = ({ quote, author }) => (
    <div className="p-6 border rounded-lg shadow-md">
        <p className="italic text-gray-700">"{quote}"</p>
        <p className="text-right mt-4 font-bold text-blue-600">{author}</p>
    </div>
);

export default LandingPage;
