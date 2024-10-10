import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import {
  HiOutlineUser,
  HiOutlineShoppingCart,
  HiOutlineHeart,
  HiOutlineSupport,
  HiOutlineLogout,
  HiOutlineMenu,
} from "react-icons/hi";

const CustomerSidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Start with sidebar closed on mobile
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate

  const links = [
    {
      to: "my-orders",
      label: "My Orders",
      icon: <HiOutlineShoppingCart />,
    },
    {
      to: "customer-profile",
      label: "My Profile",
      icon: <HiOutlineUser />,
    },
    {
      to: "cart", // Added cart link
      label: "My Cart",
      icon: <HiOutlineShoppingCart />, // You can choose an icon for the cart
    },
    // Add more customer-specific links here
  ];

  // Logout handler
  const handleLogout = () => {
    // Add any logout logic here (e.g., clearing tokens, etc.)
    navigate("/auth/login"); // Navigate to /auth/login
  };

  return (
    <div className="relative">
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 w-64 bg-white shadow-md h-screen flex flex-col transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 z-50`}
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-800">
            Customer Panel
          </h1>
          <button
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={() => setIsOpen(false)}
          >
            &times;
          </button>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {links.map(({ to, label, icon }) => (
              <li key={to}>
                <Link
                  to={to}
                  onClick={() => setIsOpen(false)} // Auto-close sidebar on mobile
                  className={`flex items-center p-3 text-sm font-medium rounded-md transition-all ${
                    location.pathname.startsWith(`/customer/${to}`)
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span className="mr-3 text-lg">{icon}</span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={handleLogout} // Add onClick event to handleLogout
            className="w-full flex items-center justify-center bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-all focus:outline-none"
          >
            <HiOutlineLogout className="mr-2 text-lg" />
            Logout
          </button>
        </div>
      </div>

      {/* Toggle Button */}
      {!isOpen && (
        <button
          className="p-2 fixed top-4 left-4 text-2xl text-gray-600 z-50 md:hidden focus:outline-none"
          onClick={() => setIsOpen(true)}
        >
          <HiOutlineMenu />
        </button>
      )}
    </div>
  );
};

export default CustomerSidebar;
