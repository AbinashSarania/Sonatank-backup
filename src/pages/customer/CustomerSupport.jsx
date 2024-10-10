// src/pages/customer/CustomerSupport.jsx

import React from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa"; // Importing icons

const CustomerSupport = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 font-raleway">
      {/* Support Info Container */}
      <div className="w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Customer Support
        </h1>
        <p className="text-gray-500 mb-6 text-center">
          We're here to help! If you have any questions or issues, please reach out to us through the following methods:
        </p>

        {/* Contact Information */}
        <div className="mt-8">
          <h2 className="text-center text-gray-700 mb-4">Contact Us</h2>
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2">
              <FaEnvelope className="w-6 h-6 text-blue-500" />
              <p className="text-gray-700">Email: <a href="mailto:support@example.com" className="text-blue-500 hover:underline">support@example.com</a></p>
            </div>
            <div className="flex items-center space-x-2">
              <FaPhone className="w-6 h-6 text-green-500" />
              <p className="text-gray-700">Phone: <a href="tel:+1234567890" className="text-green-500 hover:underline">+1 234-567-890</a></p>
            </div>
          </div>
        </div>

        {/* Help Message */}
        <p className="mt-6 text-gray-600 text-center">
          Our support team is available from 9 AM to 6 PM, Monday to Friday. We'll get back to you as soon as possible!
        </p>
      </div>
    </div>
  );
};

export default CustomerSupport;
