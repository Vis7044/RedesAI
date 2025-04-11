import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Get in Touch</h1>
      <p className="text-lg text-gray-600 mb-8">
        Feel free to reach out to us!
      </p>

      <form className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-hidden mb-4"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-700">
          Email:{" "}
          <a
            href="mailto:your-email@gmail.com"
            className="text-blue-500 hover:underline"
          >
            theGreatBhagat@gmail.com
          </a>
        </p>
        <p className="text-gray-700 mt-2">
          Phone:{" "}
          <a href="tel:+1234567890" className="text-blue-500 hover:underline">
            +91 8240347870
          </a>
        </p>
      </div>
    </div>
  );
};

export default Contact;
