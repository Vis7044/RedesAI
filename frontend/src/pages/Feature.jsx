

import React from "react";
import { motion } from "framer-motion";
import { FaYoutube, FaWhatsapp, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const services = [
  {
    name: "YouTube",
    icon: <FaYoutube size={40} className="text-red-500" />,
    status: "available",
    description: "Analyze YouTube videos for sentiment in comments.",
  },
  {
    name: "WhatsApp",
    icon: <FaWhatsapp size={40} className="text-green-500" />,
    status: "coming_soon",
    description: "We're working on bringing WhatsApp chat sentiment analysis.",
  },
  {
    name: "Twitter",
    icon: <FaTwitter size={40} className="text-blue-400" />,
    status: "coming_soon",
    description: "Soon, analyze public tweets to measure sentiment trends.",
  },
];

const statusColors = {
  available: "bg-green-100 text-green-700",
  coming_soon: "bg-yellow-100 text-yellow-700",
};

const statusText = {
  available: "Available",
  coming_soon: "Coming Soon",
};

const Feature = () => {
  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto min-h-screen text-white">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold text-center mb-12"
      >
        Our Services
      </motion.h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <motion.div
            key={service.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.2 }}
            className="bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-lg hover:shadow-blue-500/30 transition-shadow duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div>{service.icon}</div>
              <span
                className={`px-3 py-1 text-xs rounded-full font-semibold ${statusColors[service.status]}`}
              >
                {statusText[service.status]}
              </span>
            </div>
            <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
            <p className="text-sm text-gray-300">{service.description}</p>
          </motion.div>
        ))}
      </div>

      <section className="py-24  text-white text-center">
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

