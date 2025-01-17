import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-24">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg mb-8">
            We are passionate about using AI and NLP to provide valuable insights from social media data.
          </p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Our Mission</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Our mission is to empower businesses, marketers, and researchers with the ability to understand public sentiment and opinions expressed on social media platforms. We strive to provide an advanced yet easy-to-use tool that helps users gain actionable insights into how people feel about their brand, products, or topics.
          </p>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <img
                src="/sahil.jpeg"
                alt="Team Member"
                className="w-32 h-32 mx-auto mb-4 rounded-full"
              />
              <h3 className="text-xl font-semibold mb-2">Sahil Sajar</h3>
              <p className="text-lg text-gray-500">Team Leader</p>
              <p className="mt-4">
                John is an expert in AI and NLP, leading the charge in building intelligent systems that solve real-world problems.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <img
                src="/vishal.jpeg"
                alt="Team Member"
                className="w-32 h-32 mx-auto mb-4 rounded-full"
              />
              <h3 className="text-xl font-semibold mb-2">Vishal Bhagat</h3>
              <p className="text-lg text-gray-500">Frontend & Backend</p>
              <p className="mt-4">
                Jane specializes in machine learning algorithms and data analysis, creating powerful models to extract insights from social media data.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <img
                src="/mithalesh.jpeg"
                alt="Team Member"
                className="w-32 h-32 mx-auto mb-4 rounded-full"
              />
              <h3 className="text-xl font-semibold mb-2">Mithalesh</h3>
              <p className="text-lg text-gray-500">Full-Stack Developer</p>
              <p className="mt-4">
                Alex is the mastermind behind the platform's architecture and user-friendly interface, ensuring that it is both robust and intuitive.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <img
                src="/mukesh.jpeg"
                alt="Team Member"
                className="w-32 h-32 mx-auto mb-4 rounded-full"
              />
              <h3 className="text-xl font-semibold mb-2">Mukesh</h3>
              <p className="text-lg text-gray-500">Full-Stack Developer</p>
              <p className="mt-4">
                Alex is the mastermind behind the platform's architecture and user-friendly interface, ensuring that it is both robust and intuitive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-20 bg-blue-500 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Contact Us</h2>
          <p className="text-lg mb-8">
            We'd love to hear from you! If you have any questions, feedback, or partnership inquiries, feel free to reach out.
          </p>
          <div className="flex justify-center gap-8">
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
