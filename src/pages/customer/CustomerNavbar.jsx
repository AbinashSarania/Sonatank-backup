// src/homepage/components/CustomerNavbar.jsx

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const CustomerNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu open/close
  const navigate = useNavigate(); // Add the navigate hook

  // Function to toggle menu open/close
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative py-4 bg-white border-b border-gray-200 font-raleway">
      <div className="relative z-10 max-w-screen mx-auto flex flex-wrap items-center justify-between px-4 md:px-8 lg:px-16">
        {/* Left side: Site title */}
        <div className="flex items-center md:order-1">
          {/* Site title */}
          <span className="self-center text-xl md:text-2xl font-semibold text-gray-900">
            Sonatank
          </span>
        </div>

        {/* Hamburger menu icon for mobile, now moved to the right */}
        <div className="flex md:hidden md:order-3">
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-900 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
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

        {/* Right side: Menu items */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-screen" : "max-h-0"
          } w-full md:max-h-none md:flex md:w-auto md:order-2`}
          id="navbar-cta"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-white shadow-lg md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-transparent md:ml-auto">
            {/* Menu item: Home */}
            <li>
              <Link
                to="/customer/customer-home"
                className="block py-2 px-3 text-lg text-gray-900 rounded-lg transition-colors hover:bg-gray-200 md:hover:bg-transparent md:hover:text-green-500"
              >
                Home
              </Link>
            </li>

            {/* Menu item: Dashboard */}
            <li>
              <Link
                to="/customer/customer-dashboard"
                className="block py-2 px-3 text-lg text-gray-900 rounded-lg transition-colors hover:bg-gray-200 md:hover:bg-transparent md:hover:text-green-500"
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default CustomerNavbar;
