// src/pages/Admin/AdminDashboard.jsx

import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminDashboard = () => { 
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 md:ml-64 p-6 overflow-y-auto">
        <Outlet /> {/* This will render the child routes */}
      </div>
    </div>
  );
};

export default AdminDashboard;
