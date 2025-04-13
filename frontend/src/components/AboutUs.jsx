import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { DivOrigami } from "./DivOrigami";

const creatorDetails = [
  {
    name: "Sahil Sajar",
    role: "Team Leader",
    desc: "Sahil is an expert in AI and NLP, leading the charge in building intelligent systems that solve real-world problems.",
    img: "/sahil.jpeg"
  },
  {
    name: "Vishal Bhagat",
    role: "Frontend & Backend",
    desc: "Vishal specializes in machine learning algorithms and data analysis, creating powerful models to extract insights from social media data.",
    img: "/vishal.jpeg"
  },
  {
    name: "Mithalesh",
    role: "Full-Stack Developer",
    desc: "Mithalesh is the mastermind behind the platform's architecture and user-friendly interface, ensuring that it is both robust and intuitive.",
    img: "/mithalesh.jpeg"
  },
  {
    name: "Mukesh Prasad Yadav",
    role: "Full-Stack Developer",
    desc: "Mukesh is the mastermind behind the platform's architecture and user-friendly interface, ensuring that it is both robust and intuitive.",
    img: "/mukesh.jpeg"
  }
];

const AboutUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="bg-black min-h-screen text-white font-sans"
      style={{
        backgroundImage:
          'radial-gradient(circle at center, #091D0E 0%,#0c0c0b 40%,  #0f0f0f 100%)',
      }}
    >
      {/* Hero Section */}
      <section className="text-white pt-32" data-aos="fade-up">
        <div className="container mx-auto text-center px-6">
          <h1 className="text-5xl font-extrabold mb-4 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 drop-shadow-lg" data-aos="zoom-in">
            About Us
          </h1>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            We are passionate about using AI and NLP to provide valuable insights from social media data.
            Things we use and provide are:
          </p>
        </div>
        <div className="flex justify-center gap-10 flex-wrap" data-aos="zoom-in-up" data-aos-delay="300">
          {[
            { src: "/nlp.png", label: "Natural Language Processing" },
            { src: "/logistic.png", label: "Logistic Regression" },
            { src: "/translation.png", label: "Translation" },
            { src: "/sentiment.png", label: "Sentiment Analysis" }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-3" data-aos="flip-left" data-aos-delay={400 + idx * 100}>
              <div className="flex justify-center items-center w-44 h-44 border-4 bg-gradient-to-r from-blue-500 to-purple-800 rounded-full hover:shadow-2xl hover:shadow-purple-600/40 transition duration-500">
                <img src={item.src} alt={item.label} className="w-32 h-auto" />
              </div>
              <h3 className="text-sm font-semibold text-gray-400">{item.label}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-20" data-aos="fade-up">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-12 text-gradient" data-aos="zoom-in">Our Mission</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto text-gray-300" data-aos="fade-up" data-aos-delay="200">
            Our mission is to empower businesses, marketers, and researchers with the ability to understand public sentiment and opinions expressed on social media platforms. We strive to provide an advanced yet easy-to-use tool that helps users gain actionable insights into how people feel about their brand, products, or topics.
          </p>
        </div>
        <div className="flex justify-center gap-10 flex-wrap" data-aos="zoom-in-up" data-aos-delay="300">
          {[
            { src: "/insight.png", label: "Insights" },
            { src: "/suggestion.png", label: "Real-time Suggestions" },
            { src: "/satisfaction.png", label: "Real-time Sentiment Analysis" }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-3" data-aos="flip-left" data-aos-delay={400 + idx * 100}>
              <div className="flex justify-center items-center w-44 h-44 border-4 backdrop-blur rounded-full hover:shadow-2xl hover:shadow-purple-600/40 transition duration-500">
                <img src={item.src} alt={item.label} className="w-32 h-auto" />
              </div>
              <h3 className="text-sm font-semibold text-gray-400">{item.label}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-20" data-aos="fade-up">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-12 text-gradient" data-aos="zoom-in">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {creatorDetails.map((member, idx) => (
              <div key={idx} data-aos="flip-up" data-aos-delay={idx * 150}>
                <DivOrigami creatorDetails={member} />
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;
