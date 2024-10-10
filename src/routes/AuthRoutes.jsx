import React from "react";
import { Routes, Route } from "react-router-dom";
import CustomerSignUp from "../pages/auth/CustomerSignUp"; // Import your customer signup page
import AdminSignUp from "../pages/auth/AdminSignUp"; // Import your admin signup page (if exists)
import JewellerSignUp from "../pages/auth/JewellerSignUp"; // Import your jeweller signup page (if exists)
import Login from "../pages/auth/Login"; // Common login
import AdminLogin from "../pages/auth/AdminLogin"; // Import the new AdminLogin component

const AuthRoutes = () => {
  return (
    <Routes>
      {/* Route for customer sign up */}
      <Route path="/signup-customer" element={<CustomerSignUp />} />

      {/* Route for admin sign up */}
      <Route path="/signup-admin" element={<AdminSignUp />} />

      {/* Route for jeweller sign up */}
      <Route path="/signup-jeweller" element={<JewellerSignUp />} />

      {/* Route for common Login */}
      <Route path="/login" element={<Login />} />

      {/* Route for Admin Login */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* You can add more auth-related routes here if needed */}
    </Routes>
  );
};

export default AuthRoutes;
