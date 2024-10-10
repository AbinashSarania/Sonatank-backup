import React, { useState, useEffect } from "react";
import { FaUsers, FaGem, FaBalanceScale, FaMoneyBillWave, FaChartLine } from "react-icons/fa";

const PlatformMetrics = () => {
  const [metrics, setMetrics] = useState({
    totalJewellers: 150,
    totalCustomers: 2000,
    totalPawns: 300,
    activePawns: 180,
    totalRevenue: 2000000, // in INR
    monthlyGrowth: 12, // in percentage
  });

  useEffect(() => {
    // Dummy data for platform metrics
    setMetrics({
      totalJewellers: 150,
      totalCustomers: 2000,
      totalPawns: 300,
      activePawns: 180,
      totalRevenue: 2000000, // in INR
      monthlyGrowth: 12, // in percentage
    });
  }, []);

  return (
    <div className="platform-metrics p-6 lg:p-8 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Platform Metrics Dashboard</h1>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Total Jewellers Card */}
        <div className="bg-blue-200 shadow-lg rounded-lg p-6 border border-gray-300 text-gray-800 transition-transform transform hover:scale-105">
          <div className="flex items-center mb-3">
            <FaGem className="w-8 h-8 mr-2 text-blue-600" />
            <h2 className="text-2xl font-semibold">Total Jewellers</h2>
          </div>
          <p className="text-3xl font-bold">{metrics.totalJewellers}</p>
          <p className="mt-2 text-gray-600">Total number of registered jewellers on the platform.</p>
        </div>

        {/* Total Customers Card */}
        <div className="bg-green-200 shadow-lg rounded-lg p-6 border border-gray-300 text-gray-800 transition-transform transform hover:scale-105">
          <div className="flex items-center mb-3">
            <FaUsers className="w-8 h-8 mr-2 text-green-600" />
            <h2 className="text-2xl font-semibold">Total Customers</h2>
          </div>
          <p className="text-3xl font-bold">{metrics.totalCustomers}</p>
          <p className="mt-2 text-gray-600">Total number of customers actively using the platform.</p>
        </div>

        {/* Total Pawns Card */}
        <div className="bg-yellow-200 shadow-lg rounded-lg p-6 border border-gray-300 text-gray-800 transition-transform transform hover:scale-105">
          <div className="flex items-center mb-3">
            <FaBalanceScale className="w-8 h-8 mr-2 text-yellow-600" />
            <h2 className="text-2xl font-semibold">Total Pawns</h2>
          </div>
          <p className="text-3xl font-bold">{metrics.totalPawns}</p>
          <p className="mt-2 text-gray-600">Total number of pawns processed through the platform.</p>
        </div>

        {/* Active Pawns Card */}
        <div className="bg-purple-200 shadow-lg rounded-lg p-6 border border-gray-300 text-gray-800 transition-transform transform hover:scale-105">
          <div className="flex items-center mb-3">
            <FaBalanceScale className="w-8 h-8 mr-2 text-purple-600" />
            <h2 className="text-2xl font-semibold">Active Pawns</h2>
          </div>
          <p className="text-3xl font-bold">{metrics.activePawns}</p>
          <p className="mt-2 text-gray-600">Currently active pawns under management.</p>
        </div>

        {/* Total Revenue Card */}
        <div className="bg-orange-200 shadow-lg rounded-lg p-6 border border-gray-300 text-gray-800 transition-transform transform hover:scale-105">
          <div className="flex items-center mb-3">
            <FaMoneyBillWave className="w-8 h-8 mr-2 text-orange-600" />
            <h2 className="text-2xl font-semibold">Total Revenue</h2>
          </div>
          <p className="text-3xl font-bold">₹{metrics.totalRevenue.toLocaleString()}</p>
          <p className="mt-2 text-gray-600">Total revenue generated on the platform (in INR).</p>
        </div>

        {/* Monthly Growth Card */}
        <div className="bg-teal-200 shadow-lg rounded-lg p-6 border border-gray-300 text-gray-800 transition-transform transform hover:scale-105">
          <div className="flex items-center mb-3">
            <FaChartLine className="w-8 h-8 mr-2 text-teal-600" />
            <h2 className="text-2xl font-semibold">Monthly Growth</h2>
          </div>
          <p className="text-3xl font-bold">{metrics.monthlyGrowth}%</p>
          <p className="mt-2 text-gray-600">Percentage growth compared to the previous month.</p>
        </div>
      </section>
    </div>
  );
};

export default PlatformMetrics;
