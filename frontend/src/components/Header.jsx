import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          RedesAI
        </Link>
        {/*Mobile view*/}
        <div className="flex gap-5">
          <button className="md:hidden block bg-white hover:bg-gray-100 py-2 px-3 rounded border">
            Sign In
          </button>

          {/* Hamburger Icon (visible on mobile) */}
          <button
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } absolute md:static top-16 left-0 w-full md:w-auto bg-white md:flex items-center space-y-4 md:space-y-0 md:space-x-4 md:shadow-none shadow-lg p-4 md:p-0`}
        >
          <Link
            to="/"
            className="block md:inline text-gray-600 hover:text-blue-600"
          >
            Home
          </Link>
          <Link
            to="/features"
            className="block md:inline text-gray-600 hover:text-blue-600"
          >
            Features
          </Link>

          <Link
            to="/about"
            className="block md:inline text-gray-600 hover:text-blue-600"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="block md:inline text-gray-600 hover:text-blue-600"
          >
            Contact
          </Link>
        </nav>

        {/* Sign In Button */}
        <button className="hidden md:block bg-white hover:bg-gray-100 py-2 px-3 rounded border">
          Sign In
        </button>
      </div>
    </header>
  );
}
