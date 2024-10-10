// src/homepage/components/HomeNavbar.jsx

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const HomeNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu open/close
  const navigate = useNavigate(); // Add the navigate hook

  // Function to toggle menu open/close
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative py-4 bg-brown-100 border-b border-gray-200">
      <div className="relative z-10 max-w-screen mx-auto flex flex-wrap items-center justify-between px-4 md:px-8 lg:px-16">
        {/* Site title */}
        <span className="self-center text-4xl  font-semibold text-gray-900 font-alex-brush">
          #sonatank
        </span>

        {/* Menu buttons */}
        <div className="flex items-center space-x-3 md:space-x-0 rtl:space-x-reverse md:order-2">
          {/* Button to Login */}
          <button
            type="button"
            onClick={() => navigate("/auth/login")} // Navigate to /auth/login
            className="px-6 py-2 text-lg font-raleway text-white bg-black border border-black transition duration-300 hover:bg-white hover:text-black"
          >
            Login
          </button>

          {/* Button to toggle mobile menu */}
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-900 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-cta"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {/* Hamburger menu icon */}
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Dropdown menu for mobile */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-screen" : "max-h-0"
          } w-full md:max-h-none md:flex md:w-auto md:order-1`}
          id="navbar-cta"
        >
          {/* Menu items */}
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-white md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-transparent">
            {/* Menu item: Home */}
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-md text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 font-raleway"
              >
                Home
              </Link>
            </li>
            {/* Menu item: About */}
            <li>
              <Link
                to="/about"
                className="block py-2 px-3 text-md text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 font-raleway"
              >
                About Us
              </Link>
            </li>
            {/* Menu item: Contact */}
            <li>
              <Link
                to="/contact"
                className="block py-2 px-3 text-md text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 font-raleway"
              >
                Contact
              </Link>
            </li>
            {/* Menu item: Blog */}
            <li>
              <Link
                to="/metal-prices"
                className="block py-2 px-3 text-md text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 font-raleway"
              >
                Metal Prices
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
