// src/pages/jeweller/JewellerDashboard.jsx

import React from "react";
import { Outlet } from "react-router-dom";
import JewellerSidebar from "./JewellerSidebar"; // Ensure this import points to your JewellerSidebar

const JewellerDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <JewellerSidebar /> {/* Sidebar on the left */}
      <div className="flex-1 md:ml-64 overflow-y-auto">
        <Outlet /> {/* This will render the child routes */}
      </div>
    </div>
  );
};

export default JewellerDashboard;
