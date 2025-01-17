import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 ">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-4">RedisAI</h3>
            <p className="text-gray-400">
              Empowering businesses with social media intelligence.
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="#features" className="hover:text-blue-400">
                  Features
                </Link>
              </li>
              <li>
                <Link to="#pricing" className="hover:text-blue-400">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="#about" className="hover:text-blue-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#contact" className="hover:text-blue-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <p className="text-gray-400 mb-2">theGreatBhagat@gmail.com</p>
            <p className="text-gray-400 mb-2">+91 8240347870</p>
            <p className="mb-2">Follow us on social media:</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                LinkedIn
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                Facebook
              </a>
            </div>
          </div>
        </div>
        
      <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
        <p>&copy; 2025 RedisAI. All rights reserved.</p>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
