import React from "react";
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
  return (
    <div className="bg-black min-h-screen text-white font-sans">
      {/* Hero Section */}
      <section className="text-white py-24 animate__animated animate__fadeIn animate__delay-1s">
        <div className="container mx-auto text-center px-6">
          <h1 className="text-5xl font-extrabold mb-4 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 drop-shadow-lg">
            About Us
          </h1>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            We are passionate about using AI and NLP to provide valuable insights from social media data.
          </p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-20 animate__animated animate__slideInUp animate__delay-1s">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-12 text-gradient">Our Mission</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto text-gray-300">
            Our mission is to empower businesses, marketers, and researchers with the ability to understand public sentiment and opinions expressed on social media platforms. We strive to provide an advanced yet easy-to-use tool that helps users gain actionable insights into how people feel about their brand, products, or topics.
          </p>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-20 animate__animated animate__slideInUp animate__delay-2s">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-12 text-gradient">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DivOrigami creatorDetails={creatorDetails[0]} />
            <DivOrigami creatorDetails={creatorDetails[1]} />
            <DivOrigami creatorDetails={creatorDetails[2]} />
            <DivOrigami creatorDetails={creatorDetails[3]} />
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-20 text-white animate__animated animate__fadeIn animate__delay-2s">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-12 text-gradient">Contact Us</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            We'd love to hear from you! If you have any questions, feedback, or partnership inquiries, feel free to reach out.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-8 text-purple-300">
            <div>
              <p className="text-xl font-semibold">Email:</p>
              <p>contact@sentimentanalysis.com</p>
            </div>
            <div>
              <p className="text-xl font-semibold">Phone:</p>
              <p>(+91) 8383888388</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
