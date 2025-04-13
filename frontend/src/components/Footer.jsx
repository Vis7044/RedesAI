import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, Facebook, Twitter, Linkedin, Github } from "lucide-react";

const navigationLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/features" },
  { label: "Contact", to: "/contact" },
];

const Footer = () => {
  return (
    <footer className=" text-gray-300 pt-12 pb-8 px-6" 
    style={{
      backgroundImage:
        'radial-gradient( #091D0E 0%,#0c0c0b 40%,  #0f0f0f 100%)',
    }}
    >
      
      <div className="lg:w-full max-w-7xl lg:mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 border-y border-gray-700 pt-10 p-5">
        
        {/* Logo & Tagline */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-4 tracking-wide">RedesAI</h2>
          <p className="text-md leading-relaxed text-gray-400">
            Empowering businesses with <span className="text-blue-500 font-sm">social media intelligence</span>.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-4">Quick Explore</h4>
          <ul className="flex lg:flex-row gap-3">
            {navigationLinks.map((label, i) => (
              <li key={i}>
                <Link
                  to={`${label.to}`}
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="hover:text-blue-500 transition-colors duration-200"
                >
                  {label.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Socials */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-4">Connect With Us</h4>
          <div className="space-y-3 mb-4">
            <p className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-500" />
              theGreatBhagat@gmail.com
            </p>
          </div>
          <div>
            <p className="mb-2 text-gray-400">Follow us:</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-500 transition">
                <Twitter className="w-5 h-5  hover:fill-blue-500 transition" />
              </a>
              <a href="#" className="hover:text-blue-500">
                <Github className="w-5 h-5 hover:fill-blue-500 transition" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-5 text-sm text-gray-500">
        © {new Date().getFullYear()} <span className="text-white font-semibold">RedesAI</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
