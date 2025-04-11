import React from "react";
import { Link } from "react-router-dom";

const Feature = () => {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-500 to-teal-500 text-white py-24">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Social Media Sentiment Analysis</h1>
          <p className="text-lg mb-8">
            An AI-powered tool to analyze the sentiment of social media comments
            and provide valuable insights.
          </p>
          <a
            href="#features"
            className="bg-white text-blue-500 px-6 py-3 rounded-full text-xl font-semibold"
          >
            Discover Features
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="bg-blue-100 p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Sentiment Detection</h3>
              <p>
                Accurately detect the sentiment behind social media comments using
                state-of-the-art NLP techniques.
              </p>
            </div>

            <div className="bg-teal-100 p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Real-Time Analysis</h3>
              <p>
                Get real-time sentiment analysis and trend insights from recent
                comments on social media platforms.
              </p>
            </div>

            <div className="bg-yellow-100 p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Multi-Language Support</h3>
              <p>
                Support for multiple languages to analyze global social media
                platforms and provide sentiment analysis in various languages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Technology Stack</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                alt="React"
                className="w-24 h-24 mx-auto mb-4"
              />
              <h3 className="font-semibold">React</h3>
            </div>

            <div className="text-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/d/d9/TensorFlow_logo.svg"
                alt="TensorFlow"
                className="w-24 h-24 mx-auto mb-4"
              />
              <h3 className="font-semibold">TensorFlow</h3>
            </div>

            <div className="text-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/56/Flask_logo.svg"
                alt="Flask"
                className="w-24 h-24 mx-auto mb-4"
              />
              <h3 className="font-semibold">Flask</h3>
            </div>

            <div className="text-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/60/Node.js_logo_2015.svg"
                alt="Node.js"
                className="w-24 h-24 mx-auto mb-4"
              />
              <h3 className="font-semibold">Node.js</h3>
            </div>
          </div>
        </div>
      </section> */}

      {/* Call to Action */}
      <section className="py-24 bg-blue-500 text-white text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6">Get Started Today!</h2>
          <p className="text-lg mb-8">
            Take your social media analysis to the next level with powerful AI
            models and real-time data insights.
          </p>
          <Link
            to={"/analyse"}
            className="bg-teal-600 hover:bg-teal-700 text-white py-3 px-8 rounded-full text-lg font-semibold"
          >
            Try It Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Feature;
