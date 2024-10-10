import React from "react";
import { Outlet, Link } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/outline"; // Updated import path for Heroicons v2
import CustomerSidebar from "./CustomerSidebar"; // Ensure this import points to your CustomerSidebar

const CustomerDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <CustomerSidebar /> {/* Sidebar on the left */}
      <div className="flex-1 md:ml-64 overflow-y-auto">
        {/* Transparent Navbar */}
        <nav className="relative py-4 bg-transparent">
          <div className="relative z-10 max-w-screen mx-auto flex items-center justify-end px-4 md:px-8 lg:px-16">
            {/* Menu items */}
            <ul className="flex space-x-4 md:space-x-8 md:flex-row">
              {/* Menu item: Home */}
              <li>
                <Link
                  to="/customer/customer-home"
                  className="block py-2 px-3 text-lg text-gray-900 rounded-full hover:bg-gray-200 hover:shadow-lg transition duration-300"
                >
                  <HomeIcon className="h-6 w-6 text-gray-700 hover:text-blue-500" />
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <Outlet /> {/* This will render the child routes */}
      </div>
    </div>
  );
};

export default CustomerDashboard;
